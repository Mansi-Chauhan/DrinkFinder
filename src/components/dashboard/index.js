import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchResult from './master/searchResult';
import axios from 'axios';
import SideBarComponent from './sidebar/side-bar';
import { Row, Col } from 'react-bootstrap';
import Loader from '../common/loader';

const Index = (props) => {

    const [cocktailName, setCocktailName] = React.useState('');
    const [cocktailData, setCocktailData] = React.useState([]);
    const [cocktailDataOrg, setCocktailDataOrg] = React.useState([]);
    const [loader, setLoader] = React.useState(false);

    // To Update CocktailData with filtered - alcohol/non alcohol data
    useEffect(() => {
        const myArrayFiltered = cocktailDataOrg.filter((el) => {
            return props.alcoholicFilterData.some((f) => {
                return f['idDrink'] === el['idDrink'];
            });
        });
        setCocktailData(myArrayFiltered);

    }, [props.alcoholicFilterData])

    useEffect(() => {
        console.log(cocktailData);
    }, [cocktailData])

    // update cocktail name
    function onChangeName(event) {
        console.log(event.target.value);
        setCocktailName(event.target.value);
    }

    // Api Call to search by cocktail name
    function searchCocktailByName() {

        // Call Api API
        console.log(cocktailName);
        setLoader(true);
        const res = axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + String(cocktailName));
        res.then(res => {
            if (res.status === 200) {
                setLoader(false);
                console.log(res.data);
                const myArrayFiltered = res.data['drinks'].filter((el) => {
                    return el['strAlcoholic'] === 'Alcoholic';
                });
                setCocktailData(myArrayFiltered);
                setCocktailDataOrg(res.data['drinks']);
                // toast.success('')
            }
        }).catch((error) => {
            setLoader(false);
        })
    }


    // update ingredient filter 
    function change_ingr(ingr) {
        // Call Api API
        console.log(cocktailName);
        if (ingr) {
            const res = axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + String(ingr));
            setLoader(true);
            res.then(res => {
                setLoader(false);
                if (res.status === 200) {
                    console.log(res.data);
                    const myArrayFiltered = cocktailDataOrg.filter((el) => {
                        return res.data['drinks'].some((f) => {
                            return f['idDrink'] === el['idDrink'];
                        });
                    });
                    console.log(myArrayFiltered);
                    setCocktailData(myArrayFiltered);
                }
            }).catch((error) => {
                setLoader(false);
            })
        }

    }

    // update category filter 
    function change_cat(cat) {
        // Call Api API
        console.log(cocktailName);
        if (cat) {
            const res = axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + String(cat));
            setLoader(true);
            res.then(res => {
                setLoader(false);
                if (res.status === 200) {
                    const myArrayFiltered = cocktailDataOrg.filter((el) => {
                        return res.data['drinks'].some((f) => {
                            return f['idDrink'] === el['idDrink'];
                        });
                    });
                    console.log(myArrayFiltered);
                    setCocktailData(myArrayFiltered);
                }
            }).catch((error) => {
                setLoader(false);
            })
        }

    }

    // update glass filter 
    function change_glass(glass) {
        // Call Api API
        if (glass) {
            const res = axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=" + String(glass));
            setLoader(true);
            res.then(res => {
                setLoader(false);
                if (res.status === 200) {
                    console.log(res.data);
                    const myArrayFiltered = cocktailDataOrg.filter((el) => {
                        return res.data['drinks'].some((f) => {
                            return f['idDrink'] === el['idDrink'];
                        });
                    });
                    setCocktailData(myArrayFiltered);
                }
            }).catch((error) => {
                setLoader(false);
            })
        }

    }

    return (<React.Fragment>
        <div style={{ height: '100%' }}>
            <Row>
                <Col xs={3} md={3} lg={3}>
                    <SideBarComponent change_ingr={change_ingr} change_cat={change_cat} change_glass={change_glass} />
                </Col>
                <Col xs={9} md={9} lg={9}>
                    <Container className="flex">
                        <div style={{ width: '100%' }}>
                            <TextField
                                id="filled-basic"
                                label="Search Cocktail Name"
                                value={cocktailName}
                                style={{ width: '70%', marginRight: '70px', background: '#e2e2e2', color: 'black' }}
                                onChange={onChangeName}
                            />
                            <Button
                                variant="contained"
                                disabled={!cocktailName}
                                onClick={searchCocktailByName}
                                style={{ marginTop: '9px' }}
                            >
                                Search
                            </Button>
                        </div>
                    </Container>

                    {!loader ?
                        cocktailData.length > 0 ? <SearchResult cocktailData={cocktailData} /> : <></>
                        :
                        <Loader />}

                </Col>

            </Row>
        </div>
    </React.Fragment>)


}


export default Index;