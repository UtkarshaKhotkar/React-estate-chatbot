# Sample Data Structure

## Expected Excel Format

Your Excel file should contain the following columns:

| Column Name | Type    | Description                          | Required |
|-------------|---------|--------------------------------------|----------|
| area        | String  | Name of the locality/area            | Yes      |
| year        | Integer | Year of the data point               | Yes      |
| price       | Float   | Property price (in currency)         | Yes      |
| demand      | Float   | Demand index or score                | No       |
| size        | Float   | Property size (sq ft/sq m)           | No       |
| type        | String  | Property type (apartment, villa)     | No       |
| transactions| Integer | Number of transactions               | No       |

## Sample Data

```
| area              | year | price    | demand | size | type      | transactions |
|-------------------|------|----------|--------|------|-----------|--------------|
| Wakad             | 2021 | 5500000  | 75     | 1200 | Apartment | 45           |
| Wakad             | 2022 | 6000000  | 80     | 1200 | Apartment | 52           |
| Wakad             | 2023 | 6500000  | 85     | 1200 | Apartment | 58           |
| Ambegaon Budruk   | 2021 | 4500000  | 65     | 1000 | Apartment | 32           |
| Ambegaon Budruk   | 2022 | 4800000  | 68     | 1000 | Apartment | 35           |
| Ambegaon Budruk   | 2023 | 5200000  | 72     | 1000 | Apartment | 40           |
| Aundh             | 2021 | 8500000  | 90     | 1500 | Apartment | 65           |
| Aundh             | 2022 | 9200000  | 92     | 1500 | Apartment | 70           |
| Aundh             | 2023 | 9800000  | 95     | 1500 | Apartment | 75           |
| Akurdi            | 2021 | 4000000  | 60     | 900  | Apartment | 28           |
| Akurdi            | 2022 | 4300000  | 63     | 900  | Apartment | 30           |
| Akurdi            | 2023 | 4700000  | 67     | 900  | Apartment | 33           |
```

## Creating Sample Data

### Option 1: Download from Google Sheets
1. Open the provided Google Sheets link
2. File → Download → Microsoft Excel (.xlsx)
3. Save as `sample_data.xlsx`

### Option 2: Create Your Own
1. Open Excel or Google Sheets
2. Create columns as shown above
3. Add your data
4. Save as .xlsx format

### Option 3: Use Python Script

```python
import pandas as pd

data = {
    'area': ['Wakad', 'Wakad', 'Wakad', 'Aundh', 'Aundh', 'Aundh'],
    'year': [2021, 2022, 2023, 2021, 2022, 2023],
    'price': [5500000, 6000000, 6500000, 8500000, 9200000, 9800000],
    'demand': [75, 80, 85, 90, 92, 95],
    'size': [1200, 1200, 1200, 1500, 1500, 1500]
}

df = pd.DataFrame(data)
df.to_excel('sample_data.xlsx', index=False)
print("Sample data created!")
```

## Data Validation

The application will:
- Automatically normalize column names (lowercase, trim spaces)
- Handle missing values gracefully
- Skip rows with invalid data
- Provide error messages for malformed files

## Tips for Best Results

1. **Consistent naming**: Use the same area names throughout
2. **Complete years**: Include all years for better trend analysis
3. **Numeric values**: Ensure price and demand are numbers
4. **No empty rows**: Remove empty rows between data
5. **Header row**: First row should contain column names

## Common Issues

### Issue: "No data found"
- **Cause**: Area name in query doesn't match Excel data
- **Solution**: Check spelling and capitalization

### Issue: "Error loading file"
- **Cause**: Invalid Excel format or corrupted file
- **Solution**: Re-save as .xlsx format

### Issue: Charts not showing
- **Cause**: Missing 'year' column or non-numeric price values
- **Solution**: Ensure year and price columns exist and contain valid numbers

## Extending the Data Model

To add more columns:

1. Add data to Excel file
2. Update `analyzer.py` to process new columns
3. Update frontend to display new data
4. No database migration needed (file-based)
