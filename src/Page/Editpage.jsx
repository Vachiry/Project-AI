import { useState, useEffect } from 'react';
import { Card, Modal, Input } from 'antd';
import './Editpage.css';
import DataTable from "react-data-table-component";

const Editpage = () => {
   
    const [questions, setQuestions] = useState([]);
    const [filteredQuestion, setfilteredQuestion] = useState([]);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState({
         question_ID: '', 
         question: '' });

    //--------------Get question from database and show----------------//
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
                    setfilteredQuestion(responseData.questionaire);
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
            cell: (row) => (
                <>
                    <button className='btn-primary-edit' onClick={() => handleEdit(row)}>Edit</button>
                    <button className='btn-primary-delete' onClick={() => handleDelete(row.question_ID)}>Delete</button>
                </>
            )
        }
    ];
    

    const handleEdit = (row) => {
        setEditedQuestion({
            question_ID: row.question_ID,
            question: row.question
        });     
        setIsEditing(true);
    };

    const handleDelete = async (questionId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/questionaire/${questionId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Remove the deleted question from the state
                setQuestions(questions.filter(question => question.question_ID !== questionId));
                setfilteredQuestion(filteredQuestion.filter(question => question.question_ID !== questionId));
                window.alert(`Question with ID ${questionId} deleted successfully.`);
            } else {
                const errorData = await response.json();
                console.error('Failed to delete question:', errorData.error);
                window.alert(`Failed to delete question: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            window.alert('Error deleting question. Please try again.');
        }
    };

    const handleSave = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Check if editedQuestion is not undefined and has both question_ID and question properties
        if (editedQuestion && editedQuestion.question_ID && editedQuestion.question) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/questionaire`,  {
                    method: 'PUT', // Use PUT method for updating existing question
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedQuestion),
                });
    
                console.log('Response:', response); // Log the response object
                
                if (response.ok) {
                    // Update the state with the new question data
                    const updatedQuestion = await response.json();
                    console.log('Updated Question:', updatedQuestion); // Log the updated question data
                    
                    // Update the questions array in state with the updated question
                    const updatedQuestions = questions.map(q => {
                        if (q.question_ID === updatedQuestion.question_ID) {
                            return updatedQuestion;
                        } else {
                            return q;
                        }
                    });
    
                    setQuestions(updatedQuestions);
                    setfilteredQuestion(updatedQuestions);
                    setIsEditing(false);
                } else {
                    const errorData = await response.json();
                    console.error('Failed to save edited question:', errorData.error);
                    window.alert(`Failed to save edited question: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error saving edited question:', error);
                window.alert('Error saving edited question. Please try again.');
            }
        } else {
            console.error('editedQuestion is not properly defined.');
            window.alert('Please provide both question ID and question text.');
        }
    };

     // -------------------search ----------------------//
    useEffect(() => {
        const result = questions.filter((question) => {
            // Trim the search term
            const searchTerm = search.trim();
            
            // Perform the search without converting to lowercase
            const questionIdMatch = question.question_ID.toString().includes(searchTerm);
            const questionTextMatch = question.question.includes(searchTerm);
    
            // Return true if either the question ID or the question text matches the search term
            return questionIdMatch || questionTextMatch;
        });
    
        setfilteredQuestion(result);
    }, [search, questions]);

    return (
        <>
            <div className="Fonthead">
                <h1>Edit</h1>
                <div className="subtext">
                    Home / Edit
                </div>
            </div>
            <Card style={{ padding: '30px' }} className='card'>
                <DataTable columns={columns} data={filteredQuestion} 
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
                 title="Edit Question"
                 visible={isEditing}
                 okText="Save"
                 onCancel={() => {
                    setIsEditing(false);
                 }}
                 onOk={handleSave}
                 >
                    <Input 
                        value={editedQuestion.question_ID} 
                        onChange={(e) => {
                            setEditedQuestion((prev) => ({
                                ...prev, 
                                question_ID: e.target.value
                            }));
                        }}
                    />
                    <Input 
                        value={editedQuestion.question}  
                        onChange={(e) => {
                            setEditedQuestion((prev) => ({
                                ...prev, 
                                question: e.target.value
                            }));
                        }}
                    />
                  
            </Modal> 
            </Card>
           
        </>
    );
}

export default Editpage;
