"""
Script to create sample real estate data for testing
Run: python create_sample_data.py
"""
import pandas as pd
import random

# Define areas (Pune localities)
areas = [
    'Wakad', 'Aundh', 'Baner', 'Hinjewadi', 'Kharadi',
    'Viman Nagar', 'Koregaon Park', 'Kalyani Nagar',
    'Ambegaon Budruk', 'Akurdi', 'Pimple Saudagar'
]

# Years
years = [2020, 2021, 2022, 2023, 2024]

# Property types
property_types = ['Apartment', 'Villa', 'Penthouse']

data = []

for area in areas:
    # Base price for each area (in lakhs)
    base_price = random.randint(40, 100) * 100000
    base_demand = random.randint(60, 95)
    
    for year in years:
        # Price increases over years
        year_factor = 1 + (year - 2020) * 0.08  # 8% annual growth
        price = int(base_price * year_factor * random.uniform(0.95, 1.05))
        
        # Demand increases slightly
        demand = min(100, base_demand + (year - 2020) * 2 + random.randint(-3, 3))
        
        # Generate multiple entries per area-year
        for _ in range(random.randint(2, 4)):
            data.append({
                'area': area,
                'year': year,
                'price': price + random.randint(-500000, 500000),
                'demand': demand + random.randint(-5, 5),
                'size': random.choice([800, 900, 1000, 1200, 1500, 1800, 2000]),
                'type': random.choice(property_types),
                'transactions': random.randint(20, 80)
            })

# Create DataFrame
df = pd.DataFrame(data)

# Sort by area and year
df = df.sort_values(['area', 'year'])

# Save to Excel
output_file = 'api/sample_data.xlsx'
df.to_excel(output_file, index=False)

print(f"✅ Sample data created successfully!")
print(f"📁 File saved: {output_file}")
print(f"📊 Total records: {len(df)}")
print(f"🏘️  Areas: {len(areas)}")
print(f"📅 Years: {min(years)} - {max(years)}")
print("\nSample data preview:")
print(df.head(10))
