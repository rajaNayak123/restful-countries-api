import { fetchCountries } from '../services/apiService.js';
import { sendJSON } from '../utils/response.js';

const getCountries = async (req, res, urlParams) => {
  try {
    let countries = await fetchCountries();
    
    // Filter Region 
    const regionParam = urlParams.get('region');
    if (regionParam) {
      countries = countries.filter(c => 
        c.region.toLowerCase() === regionParam.toLowerCase()
      );
    }

    // Filter Population greater than X 
    const minPopParam = urlParams.get('min_pop');
    if (minPopParam) {
        const minPop = parseInt(minPopParam);
        if (!isNaN(minPop)) {
            countries = countries.filter(c => c.population >= minPop);
        }
    }

    const sortField = urlParams.get('sort');
    const sortDirection = urlParams.get('order'); 

    if (sortField) {
      countries.sort((countryA, countryB) => {
        let valueA, valueB;

        // get the specific values we want to compare from each country
        if (sortField === 'population') {
          valueA = countryA.population;
          valueB = countryB.population;
        } else if (sortField === 'name') {
          valueA = countryA.name.common.toLowerCase();
          valueB = countryB.name.common.toLowerCase();
        } else {
          return 0;
        }

        // Compare the two values (Ascending)
        let comparisonResult = 0;
        if (valueA < valueB) {
          comparisonResult = -1; // valueA comes first
        } else if (valueA > valueB) {
          comparisonResult = 1;  // valueB comes first
        }

        // Flip the result if the user requested Descending order
        if (sortDirection === 'desc') {
          return comparisonResult * -1; // Reverses the order
        }

        return comparisonResult;
      });
    }

    sendJSON(res, 200, {
      count: countries.length,
      data: countries.map(c => ({
        name: c.name.common,
        region: c.region,
        population: c.population
      }))
    });

  } catch (error) {
    console.error(error);
    sendJSON(res, 500, { error: 'Failed to fetch data' });
  }
};

export { getCountries };