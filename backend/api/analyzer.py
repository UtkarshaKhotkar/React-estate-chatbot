import pandas as pd
import re
from datetime import datetime


class RealEstateAnalyzer:
    def __init__(self, file_path):
        self.file_path = file_path
        self.df = self.load_data()
    
    def load_data(self):
        """Load Excel data into pandas DataFrame"""
        try:
            df = pd.read_excel(self.file_path)
            # Normalize column names
            df.columns = df.columns.str.strip().str.lower()
            return df
        except Exception as e:
            raise Exception(f"Error loading file: {str(e)}")
    
    def extract_areas(self, query):
        """Extract area names from query"""
        query_lower = query.lower()
        areas = []
        
        # Get unique areas from dataset
        if 'area' in self.df.columns:
            dataset_areas = self.df['area'].unique()
            for area in dataset_areas:
                if str(area).lower() in query_lower:
                    areas.append(area)
        
        return areas
    
    def extract_years(self, query):
        """Extract year range from query"""
        years = re.findall(r'\b(20\d{2})\b', query)
        if years:
            return [int(y) for y in years]
        
        # Check for "last X years"
        last_years_match = re.search(r'last (\d+) years?', query.lower())
        if last_years_match:
            num_years = int(last_years_match.group(1))
            current_year = datetime.now().year
            return list(range(current_year - num_years, current_year + 1))
        
        return None
    
    def filter_data(self, areas=None, years=None):
        """Filter DataFrame based on areas and years"""
        filtered_df = self.df.copy()
        
        if areas:
            filtered_df = filtered_df[filtered_df['area'].isin(areas)]
        
        if years and 'year' in filtered_df.columns:
            filtered_df = filtered_df[filtered_df['year'].isin(years)]
        
        return filtered_df
    
    def generate_summary(self, query, filtered_df, areas):
        """Generate natural language summary"""
        if filtered_df.empty:
            return "No data found for the specified query."
        
        summary_parts = []
        
        # Determine query type
        is_comparison = 'compare' in query.lower()
        is_price_query = 'price' in query.lower()
        is_demand_query = 'demand' in query.lower()
        
        if is_comparison and len(areas) >= 2:
            summary_parts.append(f"Comparison analysis for {' and '.join(areas)}:")
            
            for area in areas:
                area_data = filtered_df[filtered_df['area'] == area]
                if not area_data.empty:
                    if 'price' in area_data.columns:
                        avg_price = area_data['price'].mean()
                        summary_parts.append(f"- {area}: Average price ₹{avg_price:,.0f}")
                    if 'demand' in area_data.columns:
                        avg_demand = area_data['demand'].mean()
                        summary_parts.append(f"  Demand index: {avg_demand:.1f}")
        else:
            area_name = areas[0] if areas else "the selected area"
            summary_parts.append(f"Analysis for {area_name}:")
            
            if 'price' in filtered_df.columns:
                avg_price = filtered_df['price'].mean()
                min_price = filtered_df['price'].min()
                max_price = filtered_df['price'].max()
                summary_parts.append(f"- Average price: ₹{avg_price:,.0f}")
                summary_parts.append(f"- Price range: ₹{min_price:,.0f} - ₹{max_price:,.0f}")
            
            if 'demand' in filtered_df.columns:
                avg_demand = filtered_df['demand'].mean()
                summary_parts.append(f"- Average demand index: {avg_demand:.1f}")
            
            if 'year' in filtered_df.columns:
                years = sorted(filtered_df['year'].unique())
                if len(years) > 1:
                    summary_parts.append(f"- Data spans from {years[0]} to {years[-1]}")
        
        return "\n".join(summary_parts)
    
    def generate_chart_data(self, filtered_df, areas):
        """Generate data for charts"""
        chart_data = []
        
        if 'year' in filtered_df.columns:
            for area in areas:
                area_data = filtered_df[filtered_df['area'] == area]
                
                if not area_data.empty:
                    grouped = area_data.groupby('year').agg({
                        'price': 'mean',
                        'demand': 'mean' if 'demand' in area_data.columns else lambda x: 0
                    }).reset_index()
                    
                    chart_data.append({
                        'area': area,
                        'data': grouped.to_dict('records')
                    })
        
        return chart_data
    
    def analyze(self, query):
        """Main analysis function"""
        try:
            # Extract parameters from query
            areas = self.extract_areas(query)
            years = self.extract_years(query)
            
            # If no areas found, return error
            if not areas:
                return {
                    'summary': 'Could not identify any area from your query. Please specify an area name.',
                    'chart_data': [],
                    'table_data': []
                }
            
            # Filter data
            filtered_df = self.filter_data(areas, years)
            
            # Generate summary
            summary = self.generate_summary(query, filtered_df, areas)
            
            # Generate chart data
            chart_data = self.generate_chart_data(filtered_df, areas)
            
            # Prepare table data
            table_data = filtered_df.head(50).to_dict('records')
            
            return {
                'summary': summary,
                'chart_data': chart_data,
                'table_data': table_data,
                'areas': areas
            }
        
        except Exception as e:
            return {
                'error': str(e),
                'summary': f'Error processing query: {str(e)}',
                'chart_data': [],
                'table_data': []
            }
