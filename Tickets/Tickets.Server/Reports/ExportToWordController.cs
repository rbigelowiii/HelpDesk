using Microsoft.LightSwitch;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using LightSwitchApplication.Implementation;
using System.Text.RegularExpressions;

namespace LightSwitchApplication
{
    public class ExportToWordController : ApiController
    {
        // GET api/<controller>
        private List<string> fieldsToDisplay = new List<string>();
        //private string reportQuery = "";
        public HttpResponseMessage Get(string entity, string serial, [FromUri]List<string> fields)
        {
            IDataServiceQueryable queryable;
            using (ServerApplicationContext ctx = ServerApplicationContext.CreateContext())
            {
                fieldsToDisplay = fields;
                //Get the queryable object for the record requested
                switch (entity)
                {
                    case "Desktops":
                    case "desktops":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.Desktops.Where(
                        x => x.Serial == serial);
                        break;
                    case "Laptops":
                    case "laptops":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.Laptops.Where(
                        x => x.Serial == serial);
                        break;
                    case "Printers":
                    case "printers":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.Printers.Where(
                        x => x.Serial == serial);
                        break;
                    case "Tablets":
                    case "tablets":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.Tablets.Where(
                        x => x.Serial == serial);
                        break;
                    case "Tickets":
                    case "tickets":
                        var ticketID = int.Parse(serial);
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.Tickets.Where(
                        x => x.Id == ticketID);
                        break;
                    case "Departments":
                    case "departments":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.Departments.Where(
                        x => x.DeptName == serial);
                        break;
                    
                    default:
                        throw new ArgumentException("Unsupported query request");
                }

                Dictionary<string, object> entityData =
                     GetDetailedData(queryable);

                MemoryStream s =
                     CreateDetailedWordDoc("Details", entityData);

                return GetWordDocResponseMessage(s, entity + " - " + serial + ".docx");
            }
        }

        public HttpResponseMessage Get(string entity, [FromUri]List<string> fields, [FromUri]string query="", [FromUri]string cat="", [FromUri]string status="", [FromUri]string pri="", [FromUri]DateTime? begin = null, [FromUri]DateTime? end = null)
        {
            IDataServiceQueryable queryable;
            using (ServerApplicationContext ctx = ServerApplicationContext.CreateContext())
            {
                fieldsToDisplay = fields;
                //Get the queryable object for the record requested
                switch (entity)
                {
                    case "Desktops":
                    case "desktops":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.SearchDesktops(query);
                        break;
                    case "Laptops":
                    case "laptops":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.SearchLaptops(query);
                        break;
                    case "Printers":
                    case "printers":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.SearchPrinters(query);
                        break;
                    case "Tablets":
                    case "tablets":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.SearchTablets(query);
                        break;
                    case "Departments":
                    case "departments":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.SearchDepartments(query);
                        break;
                    case "Tickets":
                    case "tickets":
                        queryable = ctx.DataWorkspace.RCCHelpDeskInventoryData.SearchTickets(query, cat, pri, status, begin, end);
                        break;
                    default:
                        throw new ArgumentException("Unsupported query request");
                }

                DataTable table = GetTableData(queryable);

                MemoryStream s =
                     CreateSummaryWordDoc(entity, table);

                return GetWordDocResponseMessage(s, entity + ".docx");
            }
        }

        private DataTable GetTableData(IDataServiceQueryable queryable)
        {

            DataTable table = new DataTable();
            System.Collections.IEnumerator enumerator =
                queryable.GetEnumerator();
            
            //Get column headers
            PropertyInfo[] columnHeaders = null;
            if (enumerator.MoveNext())
            {
                columnHeaders = enumerator.Current.GetType().GetProperties(
                    BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static);
                if (fieldsToDisplay.Count > 0)
                {
                    foreach (var heading in columnHeaders)
                    {
                        if (fieldsToDisplay.Contains(heading.Name))
                        {
                            table.Columns.Add(heading.Name, Nullable.GetUnderlyingType(heading.PropertyType) ?? heading.PropertyType);
                        }
                    }

                    //Write out values
                    foreach (var element in queryable)
                    {
                        var row = table.NewRow();
                        foreach (var heading in columnHeaders)
                        {
                            if (fieldsToDisplay.Contains(heading.Name))
                            {
                                row[heading.Name] = heading.GetValue(element) == null ? System.DBNull.Value :
                                    heading.GetValue(element);
                            }
                        }
                        table.Rows.Add(row);
                    }
                }
                else
                {
                    foreach (var heading in columnHeaders)
                    {
                        table.Columns.Add(heading.Name , Nullable.GetUnderlyingType(heading.PropertyType) ?? heading.PropertyType);
                    }

                    //Write out values
                    foreach (var element in queryable)
                    {
                        
                        var row = table.NewRow();
                        foreach (var heading in columnHeaders)
                        {
                            row[heading.Name] = heading.GetValue(element) == null ? System.DBNull.Value : heading.GetValue(element);
                        }
                        table.Rows.Add(row);
                    }
                }
            }
            return table;
        }

        private Dictionary<string, object> GetDetailedData(IDataServiceQueryable queryable)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            System.Collections.IEnumerator enumerator = queryable.GetEnumerator();

            //Get column headers
            PropertyInfo[] columnHeaders = null;
            if (enumerator.MoveNext())
            {
                columnHeaders = enumerator.Current.GetType().GetProperties(
                     BindingFlags.Public | BindingFlags.Instance |
                     BindingFlags.Static);
        
                //write detailed values
                if (fieldsToDisplay.Count > 0)
                {
                    foreach (var heading in columnHeaders)
                    {
                        if (fieldsToDisplay.Contains(heading.Name))
                        {
                            dictionary.Add(heading.Name,
                                heading.GetValue(enumerator.Current));
                        }                        
                    }
                }
                else
                {
                    foreach (var heading in columnHeaders)
                    {
                        dictionary.Add(heading.Name,
                        heading.GetValue(enumerator.Current));
                    }
                }
            }

            return dictionary;
        }


        private MemoryStream CreateSummaryWordDoc(string entityName, DataTable dataTable)
        {
            MemoryStream s = new MemoryStream();
            DateTime newDate;
            //Create word document
            using (WordprocessingDocument wordDocument =
                WordprocessingDocument.Create(s, WordprocessingDocumentType.Document, true))
            {

                wordDocument.AddMainDocumentPart();
                wordDocument.MainDocumentPart.Document = new Document(new Body());
                DocumentSettingsPart settingsPart = wordDocument.MainDocumentPart.DocumentSettingsPart;
                if (settingsPart == null)
                    settingsPart = wordDocument.MainDocumentPart.AddNewPart<DocumentSettingsPart>();
                settingsPart.Settings = new Settings(
                  new Compatibility(
                    new CompatibilitySetting()
                    {
                        Name = new EnumValue<CompatSettingNameValues>
                                (CompatSettingNameValues.CompatibilityMode),
                        Val = new StringValue("15"),
                        Uri = new StringValue
                                ("http://schemas.microsoft.com/office/word")
                    }
                ));
                settingsPart.Settings.Save();

                Body body = wordDocument.MainDocumentPart.Document.Body;

                // Get the Styles part for this document.
                if (wordDocument.MainDocumentPart.StyleDefinitionsPart == null)
                {
                    new Styles().Save(
                        wordDocument.MainDocumentPart.AddNewPart<StyleDefinitionsPart>());
                } 
                wordDocument.MainDocumentPart.StyleDefinitionsPart.Styles.Append(GetTitleStyle());
                wordDocument.MainDocumentPart.StyleDefinitionsPart.Styles.Append(GetTableStyle());

                //Add Title to Document
                body.Append(
                    new Paragraph(
                      new ParagraphProperties(new ParagraphStyleId() { Val = "Title" }),
                      new Run(new Text(entityName))
                     )
                );

                //Add table of entries in the entity
                Table table = new Table();
                table.Append(
                    new TableProperties(
                    new TableStyle() { Val = "GridTable1Light-Accent1" },
                    new TableLook()
                    {
                        FirstRow = true
                    }
                    )
                );

                //Add heading row for table
                TableRow headingRow = new TableRow();
                foreach (var column in dataTable.Columns)
                {
                    headingRow.Append(new TableCell(new Paragraph(
                        new Run(new Text(column.ToString() == "LocationName" ? "Location" :
                                            column.ToString() == "OperatingSystem1" ? "Operating System" :
                                            column.ToString() == "ComputerName" ? "Computer Name" :
                                            column.ToString() == "EndUser1" ? "End User" :
                                            column.ToString() == "WarrantyExp" ? "Warranty Expire" :
                                            column.ToString() == "ShipDate" ? "Ship Date" :
                                            column.ToString())))));
                }
                table.Append(headingRow);

                foreach (DataRow dataRow in dataTable.Rows)
                {
                    TableRow row = new TableRow();
                    foreach (var cell in dataRow.ItemArray)
                    {
                        row.Append(new TableCell(new Paragraph(
                            new Run(new Text(DateTime.TryParse(cell.ToString(), out newDate) ?
                                newDate.ToShortDateString() :
                                cell.ToString())))));
                    }
                    table.Append(row);
                }
                wordDocument.MainDocumentPart.Document.Append(table);

                wordDocument.MainDocumentPart.Document.Save();
                wordDocument.Close();
            }

            return s;
        }
        
        private MemoryStream CreateDetailedWordDoc(string title, Dictionary<string, object> entityData)
        {
            MemoryStream s = new MemoryStream();
            DateTime dateValue;

            //Create word document
            using (WordprocessingDocument wordDocument =
                  WordprocessingDocument.Create(s, WordprocessingDocumentType.Document, true))
            {
                //Create the main document part, which is the part that holds the text.
                wordDocument.AddMainDocumentPart();
                wordDocument.MainDocumentPart.Document = new Document(new Body());

                DocumentSettingsPart settingsPart = wordDocument.MainDocumentPart.DocumentSettingsPart;
                if (settingsPart == null)
                    settingsPart = wordDocument.MainDocumentPart.AddNewPart<DocumentSettingsPart>();
                settingsPart.Settings = new Settings(
                  new Compatibility(
                    new CompatibilitySetting()
                    {
                        Name = new EnumValue<CompatSettingNameValues>
                                (CompatSettingNameValues.CompatibilityMode),
                        Val = new StringValue("15"),
                        Uri = new StringValue
                                ("http://schemas.microsoft.com/office/word")
                    }
                ));
                settingsPart.Settings.Save();

                Body body = wordDocument.MainDocumentPart.Document.Body;

                // Get the Styles part for this document.
                if (wordDocument.MainDocumentPart.StyleDefinitionsPart == null)
                {
                    new Styles().Save(
                        wordDocument.MainDocumentPart.AddNewPart<StyleDefinitionsPart>());
                }
                wordDocument.MainDocumentPart.StyleDefinitionsPart.Styles.Append(
                    GetTitleStyle());
                wordDocument.MainDocumentPart.StyleDefinitionsPart.Styles.Append(
                    GetHeading1Style());

                //Add Title to Document
                body.Append(
                    new Paragraph(
                        new ParagraphProperties(new ParagraphStyleId() { Val = "Title" }),
                      new Run(new Text(title))
                   )
               );
                

                //Add Each property
                    foreach (var entry in entityData)
                    {
                        String valS = entry.Value == null ? "" :
                            DateTime.TryParse(entry.Value.ToString(), out dateValue) ?
                            dateValue.ToShortDateString() : entry.Value.ToString();
                        body.Append(
                        new Paragraph(
                            new ParagraphProperties(new ParagraphStyleId() { Val = "Heading1" }),
                            new Run(new Text(entry.Key == "LocationName" ? "Location" :
                                            entry.Key == "OperatingSystem1" ? "Operating System" :
                                            entry.Key == "ComputerName" ? "Computer Name" :
                                            entry.Key == "EndUser1" ? "End User" :
                                            entry.Key == "WarrantyExp" ? "Warranty Expire" :
                                            entry.Key == "ShipDate" ? "Ship Date" :
                                            entry.Key))),
                            new Paragraph(new Run(new Text(valS)))
                        );
                    }
                
                wordDocument.MainDocumentPart.Document.Save();
                wordDocument.Close();
                
            }

            return s;
        }

        private HttpResponseMessage GetWordDocResponseMessage(MemoryStream s, String suggestDocName)
        {
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);

            //write the document
            result.Content = new StreamContent(new MemoryStream(s.ToArray()));

            //Set the content type to .docx
            result.Content.Headers.ContentType =
                 new System.Net.Http.Headers.MediaTypeHeaderValue(
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

            //Set the name of the file
            result.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = suggestDocName;
            
            return result;
        }
        Style GetTitleStyle()
        {
            Style titleStyle = new Style()
            {
                Type = StyleValues.Paragraph,
                StyleId = "Title",
                CustomStyle = true
            };
            titleStyle.Append(
                 new StyleName() { Val = "Title" },
                 new StyleParagraphProperties(
                    new Justification() {Val=JustificationValues.Center}
                 ),
                 new StyleRunProperties(
                    new Color() { Val = "2E74B5" },
                    new FontSize() { Val = "56" }
                 )
            );
            return titleStyle;
        }
        Style GetTableStyle()
        {
            Style tableStyle = new Style()
            {
                Type = StyleValues.Table,
                StyleId = "GridTable1Light-Accent1"
            };
            tableStyle.Append(
                new StyleName() { Val = "Grid Table 1 Light Accent 1" },
                new StyleParagraphProperties(
                    new SpacingBetweenLines()
                    {
                        After = "0",
                        Line = "240",
                        LineRule = LineSpacingRuleValues.Auto
                    }
                    ),
                new StyleTableProperties(
                    new TableStyleRowBandSize() { Val = 1 },
                    new TableStyleColumnBandSize() { Val = 1 },
                    new TableIndentation() { Width = 0, Type = TableWidthUnitValues.Dxa },
                    new TableBorders(
                        new TopBorder() { Val = BorderValues.Single, Color = "BDD6EE" },
                        new LeftBorder() { Val = BorderValues.Single, Color = "BDD6EE" },
                        new BottomBorder() { Val = BorderValues.Single, Color = "BDD6EE" },
                        new RightBorder() { Val = BorderValues.Single, Color = "BDD6EE" },
                        new InsideHorizontalBorder()
                        {
                            Val = BorderValues.Single,
                            Color = "BDD6EE"
                        },
                        new InsideVerticalBorder()
                        {
                            Val = BorderValues.Single,
                            Color = "BDD6EE"
                        }
                        ),
                    new TableCellMarginDefault(
                        new TableCellLeftMargin() { Width = 108, Type = TableWidthValues.Dxa },
                        new TableCellRightMargin() { Width = 108, Type = TableWidthValues.Dxa }
                        )
                    ),
                new TableStyleProperties(
                    new RunPropertiesBaseStyle(
                        new Bold()
                        ),
                    new TableStyleConditionalFormattingTableProperties(
                        new TableStyleConditionalFormattingTableCellProperties(
                            new BottomBorder() { Val = BorderValues.Double, Color = "9CC2E5" }
                            )
                        )
                    ) { Type = TableStyleOverrideValues.FirstRow }
             );

            return tableStyle;
        }
        Style GetHeading1Style()
        {
            Style heading1Style = new Style()
            {
                Type = StyleValues.Paragraph,
                StyleId = "Heading1"
            };
            heading1Style.Append(
                new StyleName() { Val = "heading 1" },
                new StyleParagraphProperties(
                     new KeepNext(),
                     new KeepLines(),
                     new SpacingBetweenLines() { Before = "240", After = "0" }
                     ),
                new StyleRunProperties(
                    new Color() { Val = "2E74B5" },
                    new FontSize() { Val = "32" }
                    )
                );

            return heading1Style;
        }
    }
}