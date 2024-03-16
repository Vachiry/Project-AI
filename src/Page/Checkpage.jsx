//import react from "react";
import { useState, useEffect } from 'react';
import { Card } from 'antd';
import './Editpage.css';
import DataTable from "react-data-table-component";
function Checkpage() {

    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        const getAPI = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/questionaire', {
                    method: 'GET',
                });

                if (response.ok) {
                    const responseData = await response.json();
                    // Update state with questionnaire data
                    setAnswers(responseData.questionaire);
                   
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
            name: <h1 className="column-name">User_ID</h1>,
            selector: (row) => row.user_ID
            
        },
        {
            name: <h1 className="column-name">Question_ID</h1>,
            selector: (row) => row.question_ID
        },
        {
            name: <h1 className="column-name">Answer</h1>,
            selector: (row) => row.answer
        },
        {
            name: <h1 className="column-name">Action</h1>,
            cell: (row) => (
                <>
                    <button className='btn-primary-edit' onClick={() => handleEdit(row)}>Edit</button>
                    <button className='btn-primary-delete' onClick={() => handleDelete(row.question_ID)}>Delete</button>
                </>
            )
        }
    ];
       
       return (
        <>
            <div className="Fonthead">
                <h1>Check</h1>
                <div className="subtext">
                    Home / Check
                </div>
            </div>
            <Card style={{ padding: '30px' }} className='card'>
                <DataTable columns={columns} data={answers} 
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
       


export default Checkpage;