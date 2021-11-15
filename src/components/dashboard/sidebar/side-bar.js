import React, { useEffect } from "react";

import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import axios from 'axios';
import Loader from '../../common/loader'



const SideBarComponent = props => {

  const [categorySublist, setCategorySublist] = React.useState([]);
  const [ingredientsSublist, setIngeredientsSublist] = React.useState([]);
  const [glassesSublist, setGlassesSublist] = React.useState([]);
  const [loader, setLoader] = React.useState(false);


  // Call Api To set category/ingredients/glasses sublist 
  useEffect(() => {
    setLoader(true);
    var categoryList = [], ingredientsList = [], glassesList = [];
    // Category List
    const res = axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
    res.then(res => {
      setLoader(false);
      if (res.status === 200) {
        if (res.data['drinks'].length) {
          (res.data['drinks']).forEach((category) => {
            categoryList.push({ 'title': category['strCategory'], 'itemId': 'cat/' + category['strCategory'] });
          })
          setCategorySublist(categoryList);
        }
      }
    }).catch((error) => {
      setLoader(false);
    })

    // Ingredients List
    const res_ingr = axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
    res_ingr.then(res_ingr => {
      setLoader(false);
      if (res_ingr.status === 200) {
        if (res_ingr.data['drinks'].length) {
          (res_ingr.data['drinks']).forEach((category) => {
            ingredientsList.push({ 'title': category['strIngredient1'], 'itemId': 'ingr/' + category['strIngredient1'] });
          })
          setIngeredientsSublist(ingredientsList);
        }
      }
    }).catch((error) => {
      setLoader(false);
    })


    // Glasses List
    const res_glasses = axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
    res_glasses.then(res_glasses => {
      if (res_glasses.status === 200) {
        // glassesList = res_glasses.data['drinks'];

        if (res_glasses.data['drinks'].length) {
          (res_glasses.data['drinks']).forEach((category) => {
            glassesList.push({ 'title': category['strGlass'], 'itemId': 'glass/' + category['strGlass'] });
          })
          setGlassesSublist(glassesList);
        }
      }
      setLoader(false);
    }).catch((error) => {
      setLoader(false);
    })
  }, [])


  return (
    <>
      {!loader ? <div style={{ height: '100%' }}>
        {console.log(ingredientsSublist)}
        {categorySublist && ingredientsSublist && glassesSublist && <Navigation
          activeItemId="/sidebar"

          onSelect={({ itemId },) => {
            console.log(itemId)
            // setItem(itemId)
            if (itemId.includes('glass/')) {
              props.change_glass(itemId.substring(itemId.indexOf('/') + 1));
            }
            else if (itemId.includes('ingr/')) {
              props.change_ingr(itemId.substring(itemId.indexOf('/') + 1));
            }
            else {
              props.change_cat(itemId.substring(itemId.indexOf('/') + 1));
            }
          }}
          items={[
            {
              title: 'Ingredients',
              itemId: 'tingredients/',
              subNav: ingredientsSublist,
            },
            {
              title: 'Category',
              itemId: 'tcategory/',
              subNav: categorySublist,
            },
            {
              title: 'Glass',
              itemId: 'tglass/',
              subNav: glassesSublist,
            },
          ]}

        />}
      </div> : <Loader />}
    </>
  );
}

export default SideBarComponent;

