import { useState, useEffect } from 'react';
import { Card, Modal, Input, Button } from 'antd';
import './Editpage.css';
import DataTable from "react-data-table-component";

import { PlusOutlined } from '@ant-design/icons';
const Editpage = () => {
   
    const [questions, setQuestions] = useState([]);
    const [filteredQuestion, setfilteredQuestion] = useState([]);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false); 
    const [editedQuestion, setEditedQuestion] = useState({
         question_ID: '', 
         question: '' });

    const [newQuestion, setNewQuestion] = useState({
            question_ID: '',
            question: ''
        });
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

    const handleSave = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/questionaire`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedQuestion),
            });
            if (response.ok) {
                const updatedQuestion = await response.json();
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
                window.alert('Question updated successfully.');
            } else {
                throw new Error('Failed to save edited question');
            }
        } catch (error) {
            console.error('Error saving edited question:', error);
            window.alert('Error saving edited question. Please try again.');
        }
    };

    const handleAddQuestion = () => {
        setIsAdding(true); // Show the modal for adding question
    }

    const handleAddQuestionSave = async () => {
        // Check if the question ID already exists
        const isQuestionIdExists = questions.some(q => q.question_ID === newQuestion.question_ID);
        if (isQuestionIdExists) {
            window.alert('Question ID already exists. Please use a different one.');
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/addquestion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion), // Use newQuestion state for new question
            });
            if (response.ok) {
                setIsAdding(false); // Hide the modal after successfully adding question
                
                // Fetch updated data after adding question
                const updatedQuestions = [...questions, newQuestion]; // Add the new question to the existing questions array
                setQuestions(updatedQuestions);
                setfilteredQuestion(updatedQuestions);
    
                // Clear the newQuestion state
                setNewQuestion({
                    question_ID: '',
                    question: ''
                });
    
                window.alert('Question added successfully.');
            } else {
                throw new Error('Failed to add question');
            }
        } catch (error) {
            console.error('Error adding question:', error);
            window.alert('Error adding question. Please try again.');
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
                <Button type="primary" 
                 icon={<PlusOutlined />}
                 style= {{ background: '#4f87d6', borderColor: '#4f87d6' } }
                onClick={handleAddQuestion}>Add Question</Button> 


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
                 okButtonProps={{ style: { background: '#1890ff', borderColor: '#1890ff' , top:'35px'} }} // Set button background and border color
                 cancelButtonProps={{ style: { background: '#f9f9f9', borderColor: '#1890ff',top:'35px' } }} // Set button background and border color
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
                        style={{ width: '100%', marginBottom: '10px' ,  padding: '10px', }}
                    />
                    <Input 
                        value={editedQuestion.question}  
                        onChange={(e) => {
                            setEditedQuestion((prev) => ({
                                ...prev, 
                                question: e.target.value
                            }));
                        }}
                        style={{
                            width: '100%',
                            padding: '10px', 
                          
                        }}
                    />
                     </Modal> 
                       {/* Modal for adding a new question */}
                <Modal
                    title="Add Question"
                    visible={isAdding} // Show this modal when isAdding is true
                    okText="Save"
                    okButtonProps={{ style: { background: '#1890ff', borderColor: '#1890ff' , top:'35px'} }} // Set button background and border color
                 cancelButtonProps={{ style: { background: '#f9f9f9', borderColor: '#1890ff',top:'35px' } }} 
                    onCancel={() => {
                        setIsAdding(false);
                    }}
                    onOk={handleAddQuestionSave} // Call handleAddQuestionSave when clicking Save
                >
                    <Input
                        placeholder="Enter Question ID"
                        value={newQuestion.question_ID}
                        onChange={(e) => setNewQuestion((prev) => ({ ...prev, question_ID: e.target.value }))}
                        style={{ width: '100%', marginBottom: '10px' ,  padding: '10px', }}
                        
                    />
                    <Input
                        placeholder="Enter Question"
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion((prev) => ({ ...prev, question: e.target.value }))}
                        style={{ width: '100%',padding: '10px', }}
                    />
                </Modal>
            </Card>
        </>
    );
}


export default Editpage;
