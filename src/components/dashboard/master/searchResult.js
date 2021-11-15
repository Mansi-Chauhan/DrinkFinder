import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '90%',
        display: 'contents'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    buttonroot: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2, 4, 3),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        bottom: '50%',
        width: '50%',
        height: '50%',
        border: '1px solid white',
        borderRadius: '11px',
    },
}));

export default function SearchResult(props) {

    const classes = useStyles();

    const [cocktailData, setCocktailData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState({});

    useEffect(() => {
        console.log(props.cocktailData)
        setCocktailData(props.cocktailData);
    }, [props.cocktailData])

    // Columns
    const columns = [

        {
            dataField: "image",
            text: "Drink Image",
            formatter: (dataField, row, { id }) => (
                <div>
                    {console.log(row)}
                    <img
                        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                        src={row['strDrinkThumb']}
                        alt="new"
                    />
                </div>

            ),
        },
        {
            dataField: 'strDrink',
            text: 'Drink Name',
            headerClasses: 'text-10 align-middle',
            classes: 'align-middle text-10 py-2',
        },
        {
            dataField: 'strAlcoholic',
            text: 'Drink Info',
            headerClasses: 'text-10 align-middle',
            classes: 'align-middle text-10 py-2',
            formatter: (dataField, row, { id }) => (
                <div>
                    {row['strAlcoholic']} {row['strCategory']} {row['strGlass']} {row['strIngredient1']} {row['strIngredient2']} {row['strIngredient3']} {row['strIngredient4']}
                </div>

            ),
        },

    ];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(row);
            setSelectedRow(row);
            setOpen(true);

        }
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (<React.Fragment>
        <div style={{ height: '100%' }}>
            <Container className="flex">
                <BootstrapTable
                    keyField="idDrink"
                    data={cocktailData}
                    columns={columns}
                    bordered={true}
                    hover={true}
                    rowEvents={rowEvents}
                    noDataIndication={ <h5>No data Found</h5> }
                />
            </Container>
        </div>
        {selectedRow && <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper} style={{ display: 'inline-table' }}>
                    <h2 id="transition-modal-title">Drink Name : {selectedRow['strDrink']} </h2>
                    <br />
                    <br />
                    <Row style={{ alignItems: 'center' }}>
                    <img
                        style={{ height: '100%', width: '30%', objectFit: 'contain' }}
                        src={selectedRow['strDrinkThumb']}
                        alt="new"
                    />
                    </Row>
                    <br></br>
                    <Row style={{ alignItems: 'center' }}>
                        <Col>
                        {selectedRow['strIngredient1'] && <Chip label={selectedRow['strIngredient1']} color="success" />}
                        {selectedRow['strIngredient2'] && <Chip label={selectedRow['strIngredient2']} color="success" />}
                        {selectedRow['strIngredient3'] && <Chip label={selectedRow['strIngredient3']} color="success" />}
                        {selectedRow['strIngredient4'] && <Chip label={selectedRow['strIngredient4']} color="success" />}
                        </Col>

                    </Row>
                    <br></br>
                    <Row style={{ alignItems: 'center' }}>
                        <Col>
                       <div>
                          { selectedRow['strInstructions']}
                       </div>
                        </Col>

                    </Row>


                </div>
            </Fade>

        </Modal>}
    </React.Fragment>)


}