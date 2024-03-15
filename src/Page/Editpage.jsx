import { useState, useEffect } from 'react';
//import axios from 'axios';
import { Card } from 'antd';
import './Editpage.css'; // Import your CSS file for styling
import DataTable from "react-data-table-component";

const Editpage = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getAPI = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/questionaire', {
                    method: 'GET',
                });

                if (response.ok) {
                    const responseData = await response.json();
                    // Update state with questionnaire data
                    setQuestions(responseData.questionaire);
                } else {
                    const errorData = await response.json();
                    console.error('API call failed:', errorData.error);
                    window.alert(`Failed to make API call: ${errorData.error}`);
                }
            } catch (error) {
                window.alert('Error during API call. Please try again.');
                console.error('Error during API call:', error);
            }
        };

        getAPI(); // Call the API function
    }, []);


    const columns = [
        {
            name: <h1 className="column-name">ID</h1>,
            selector: (row) => row.question_ID
            
        },
        {
            name: <h1 className="column-name">Question</h1>,
            selector: (row) => row.question
        },
        {
            name: <h1 className="column-name">Action</h1>,
            cell: (row) => <button className='btn-primary' onClick={() => alert(row)}>Edit</button>
        }
    ];

    return (
        <>
            <div className="Fonthead">
                <h1>Edit</h1>
                <div className="subtext">
                    Home / Edit
                </div>
            </div>
            <Card style={{ padding: '30px' }} className='card'>
                <DataTable columns={columns} data={questions} 
                pagination 
                fixedHeader
                fixedHeaderScrollHeight="450px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                paginationRowsPerPageOptions={[5, 10, 15, 20]} 
               />
            </Card>
        </>
    );
}

export default Editpage;
  
