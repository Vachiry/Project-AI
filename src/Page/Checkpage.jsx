//import react from "react";
import { useState, useEffect } from 'react';
import { Card , Button, Input, Modal } from 'antd';
import './Editpage.css';
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
//import { ExcelFile, ExcelSheet, ExcelColumn } from "react-data-export";
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';

//import { useParams } from 'react-router-dom';
function Checkpage() {

    const [answers, setAnswers] = useState([]);
    const [filteredAnswer, setfilteredAnswer] = useState([]);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedAnswer, setEditedAnswer] = useState({ user_ID: '', question_ID: ' ',answer: ''  });
    //const { user_ID, question_ID } = useParams(" ");
    
    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const url = `http://127.0.0.1:5000/GetAns`;
                const response = await fetch(url);

                if (response.ok) {
                    const responseData = await response.json();
                    setAnswers(responseData.answer);
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

        fetchAnswers();
    }, []);
    
                const handleEdit = (row) => {
                    setEditedAnswer({
                        user_ID : row.user_ID,
                        question_ID : row.question_ID,
                        answer: row.answer,
                       
                     });     
                     setIsEditing(true);
                };
                  

                const handleSave = async (event) => {
                    event.preventDefault(); // Prevent the default form submission behavior
                    
                   
                    if (editedAnswer && editedAnswer.user_ID && editedAnswer.question_ID && editedAnswer.answer) {
                        try {
                            const response = await fetch(`http://127.0.0.1:5000/UpdateAns`,  {
                                method: 'PUT', // Use PUT method for updating existing question
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(editedAnswer),
                            });
                
                            console.log('Response:', response); // Log the response object
                            
                            if (response.ok) {
                                // Update the state with the new question data
                                const updatedAnswer = await response.json();
                                console.log('Updated Answer:', updatedAnswer); // Log the updated question data
                                
                                // Update the questions array in state with the updated question
                                const updatedAnswers = answers.map(q => {
                                    if (q.question_ID === updatedAnswer.question_ID) {
                                        return updatedAnswer;
                                    } else {
                                        return q;
                                    }
                                });
                
                                setAnswers(updatedAnswers);
                                setfilteredAnswer(updatedAnswers);
                                setIsEditing(false);
                                window.location.reload();
                            } else {
                                const errorData = await response.json();
                                console.error('Failed to save edited answer:', errorData.error);
                                window.alert(`Failed to save edited answer: ${errorData.error}`);
                            }
                        } catch (error) {
                            console.error('Error saving edited answer:', error);
                            window.alert('Error saving edited answer. Please try again.');
                        }
                    } else {
                        console.error('editedAnswer is not properly defined.');
                        window.alert('Please provide  User ID , Question ID and Answer text.');
                    }
                };



                const handleDelete = async (userId, questionId) => {
                    try {
                        const response = await fetch(`http://127.0.0.1:5000/UpdateAns/${userId}/${questionId}`, {
                            method: 'DELETE',
                        });
                
                        if (response.ok) {
                            // Remove the deleted answer from the state
                            setAnswers(answers.filter(answer => answer.user_ID !== userId || answer.question_ID !== questionId));
                            setfilteredAnswer(filteredAnswer.filter(answer => answer.user_ID !== userId || answer.question_ID !== questionId));
                            window.alert(`Answer with user ID ${userId} and question ID ${questionId} deleted successfully.`);
                            window.location.reload();
                        } else {
                            const errorData = await response.json();
                            console.error('Failed to delete answer:', errorData.error);
                            window.alert(`Failed to delete answer: ${errorData.error}`);
                        }
                    } catch (error) {
                        console.error('Error deleting answer:', error);
                        window.alert('Error deleting answer. Please try again.');
                    }
                };
    const columns = [
        {
            name: <h1 className="column-name">User_ID</h1>,
            selector: (row) => row.user_ID,
            width: '200px',
            sortable: true
            
        },
        {
            name: <h1 className="column-name">Question_ID</h1>,
            selector: (row) => row.question_ID,
            width: '200px',
            sortable: true
        },
        {
            name: <h1 className="column-name">Answer</h1>,
            selector: (row) => row.answer,
            width: '300px',
            wrap: true
        },
        {
            name: <h1 className="column-name">Time</h1>,
            selector: (row) => row.timestamp,
            width: '220px',
            sortable: true
        },
        {
            name: <h1 className="column-name">Action</h1>,
            cell: (row) => (
                <>
                    <button className='btn-primary-edit' onClick={() => handleEdit(row)}>Edit</button>
                    <button className='btn-primary-delete' onClick={() => handleDelete(row.user_ID,row.question_ID)}>Delete</button>
                </>
            ),
            width: '200px'
          
          
        }
    ];
    
    useEffect(() => {
        if (answers && answers.length > 0) {
            const result = answers.filter((answer) => {
                // Trim the search term
                const searchTerm = search.trim().toLowerCase();
        
                // Check if any of the fields contain the search term
                return (
                    (typeof answer.user_ID === 'string' && answer.user_ID.toLowerCase().includes(searchTerm)) ||
                    (answer.question_ID && answer.question_ID.toString().toLowerCase().includes(searchTerm)) ||
                    (typeof answer.answer === 'string' && answer.answer.toLowerCase().includes(searchTerm))
                );
            });
        
            setfilteredAnswer(result);
        }
    }, [search, answers]);
    
    
    const handleExportCSV = () => {
        // If you want to export the filtered data, use `filteredAnswer` instead of `answers`
        // You can customize the filename as needed
        const filename = 'answers.csv';
        // The CSVLink component will automatically trigger the download when clicked
        return (
            <CSVLink data={answers} filename={filename}>
                <Button type="primary">Export to CSV</Button>
            </CSVLink>
        );
    };

  
       return (
        <>
            <div className="Fonthead">
                <h1>Check</h1>
                <div className="subtext">
                    Home / Check
                </div>
            
            </div>
          
            <Card style={{padding: '30px' }} className='card'>
            {handleExportCSV()}
                <DataTable columns={columns} data={filteredAnswer} 
                pagination 
                fixedHeader
                fixedHeaderScrollHeight="450px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
               
                paginationRowsPerPageOptions={[5, 10, 15, 20]} 
                subHeader
                subHeaderComponent={
                   <input type="text"          
                   className="search-box"
                   placeholder= ' Search here... '
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
             
                   />}
            
                />
                <Modal
                 title="Edit Answer"
                 visible={isEditing}
                 okText="Save"
                 okButtonProps={{ style: { background: '#1890ff', borderColor: '#1890ff' } }} // Set button background and border color
                 cancelButtonProps={{ style: { background: '#f9f9f9', borderColor: '#1890ff' } }} // Set button background and border color
                 onCancel={() => {
                    setIsEditing(false);
                 }}
                 onOk={handleSave}
                
                 
                 >
                    <Input 
                        value={editedAnswer.user_ID} 
                        onChange={(e) => {
                            setEditedAnswer((prev) => ({
                                ...prev, 
                                user_ID: e.target.value
                            }));
                            
                        }}
                        placeholder= ' User ID '
                        style={{ width: '100%', marginBottom: '7px' ,  padding: '10px', }}
                    />
                    <Input 
                        value={editedAnswer.question_ID}  
                        onChange={(e) => {
                            setEditedAnswer((prev) => ({
                                ...prev, 
                                question_ID: e.target.value
                            }));
                        }}
                        placeholder= ' Question ID '
                        style={{
                            width: '100%',
                            marginBottom: '7px',
                            padding: '10px', 
                          
                        }}
                    />
                     <Input 
                        value={editedAnswer.answer}  
                        onChange={(e) => {
                            setEditedAnswer((prev) => ({
                                ...prev, 
                                answer: e.target.value
                            }));
                        }}
                        placeholder= ' Answer '
                        style={{
                            width: '100%',
                            padding: '10px', 
                          
                        }}
                    />
                     </Modal> 
       
              
         </Card>
           
        </>
    );
}
       


export default Checkpage;