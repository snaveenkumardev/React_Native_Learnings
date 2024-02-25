import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList} from 'react-native'
import React, {useState} from 'react'

type deletePopupProps = {
    popupVisible: boolean,
    deleteConfirmation: (confirm: string) => void
}


const DeleteConfirmationPopup = ({popupVisible, deleteConfirmation}: deletePopupProps)=> {
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={popupVisible}
        >
            <View style= {styles.deleteConfirmPopupContainer}>
                <View style= {styles.deletePopupContent}>
                    <Text style= {styles.deletePopupTitle}>Are you sure to delete?</Text>
                    <View style= {styles.deletePopupButtonsContent}>
                        <TouchableOpacity style= {[styles.deleteConfirmButton, {marginRight: 20}]} onPress={()=> deleteConfirmation("No")}>
                            <Text>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style= {styles.deleteConfirmButton} onPress={()=> deleteConfirmation("Yes")}>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                    </View>   
                </View>
            </View>
        </Modal>
    )
}


const TodoList = () => {

    const [todoInputs, setTodoInputs] = useState("")
    const [todoList, setTodoList] = useState([])
    const [todoListId, setTodoListId] = useState<number>(1)
    const [deleteConfirmPopup, setDeleteConfirmPopup] = useState({
        visible: false,
        deleteTodoId: 0
    })

    const renderTodoList = ({item: todolist})=> {
        return (
            <View style= {styles.todoListItemContent}>
                <Text style= {styles.todoListItem}>{todolist.data}</Text>
                <TouchableOpacity style= {styles.todoDeleteButton} onPress={()=> setDeleteConfirmPopup((deleteconfirmpopup)=> {
                   return {...deleteconfirmpopup, visible: true, deleteTodoId: todolist.id }
                })}>
                    <Text style= {{fontSize: 20, color: "black", fontWeight: "600"}}>X</Text>

                </TouchableOpacity>
            </View>
            
        )
    }

    const addTodo = ()=> {
        setTodoList((todolist)=> {
            return [...todolist, {id: todoListId, data: todoInputs}]
        })
        setTodoInputs("");
        setTodoListId(todoListId + 1)
    }

    function deleteTodo(todoId: number) {
        console.log(todoId)
        let todos = todoList.filter((todolist)=> {
            if (todolist.id != todoId) {
                return true
            }
        }) 
       deleteConfirmationDone()
        setTodoList(todos)
    }

    const deleteConfirmation = (confirmation: string) => {
        confirmation == "Yes" && deleteTodo(deleteConfirmPopup.deleteTodoId)
        confirmation == "No" && deleteConfirmationDone()
    }

    const deleteConfirmationDone = ()=> {
        setDeleteConfirmPopup((deleteconfirmpopup)=> {
            return {...deleteconfirmpopup, visible: false, deleteTodoId: 0}
        })
    }

  return (
    <>
     <View style= {styles.addTodoContainer}>
        <DeleteConfirmationPopup popupVisible= {deleteConfirmPopup.visible} deleteConfirmation = {deleteConfirmation}/>
        <Text style= {styles.titleText}>Add Today Todo</Text>
        <TextInput
        style={styles.todoInputField}
        onChangeText={(todoinput: string) => setTodoInputs(todoinput)}
        value={todoInputs}
        placeholder='Add Todo'
      />
      <View style= {styles.addTodoButtonContainer}>
      <TouchableOpacity style= {styles.addTodoButton} onPress={addTodo}>
        <Text style= {styles.addTodoButtonText}>Add</Text>
      </TouchableOpacity>

      </View>
     
     
     </View>
     <View style= {styles.todoListContainer}>
        <Text style= {[styles.titleText, {marginVertical: 10}]}>
            Todo List
        </Text>

        <FlatList
        data={todoList}
        renderItem={renderTodoList}
        keyExtractor={(item, index) => String(index)}
        ListEmptyComponent={<Text style= {styles.noTodoText}>No Todos</Text>}
      />

     </View>

    
    </>
   
  )
}

export default TodoList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue"
    },
    addTodoContainer: {
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    titleText: {
        fontSize: 20,
        color: "black",
        fontWeight: "700"
    },
    todoInputField: {
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderRadius: 10,
        marginVertical: 20,
        fontSize: 18,
        color: "black",
        fontWeight: "600" 
    },
    addTodoButtonContainer: {
        alignItems: "center"

    },
    addTodoButton: {
        width: 150,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 10
    },
    addTodoButtonText: {
        fontSize: 17,
        color: "black",
        textAlign: "center",
        fontWeight: "500"
    },
    todoListContainer: {
        flex: 1,
        borderWidth: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10
    },
    todoListItemContent: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        marginBottom: 15
    },
    todoListItem: {
        paddingVertical: 15,
        paddingLeft: 10,
        fontSize: 16,
        color: "black",
        fontWeight: "600",
        flex: 0.87,
    },
    todoDeleteButton: {
        flex: 0.13,
        justifyContent: "center",
        alignItems: "center"
    },
    noTodoText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        fontWeight: "500"
    },
    deleteConfirmPopupContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    deletePopupContent: {
        flex: 0.25,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    deletePopupTitle: {
        fontSize: 20,
        color: "black"
    },
    deletePopupButtonsContent: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center"
    },
    deleteConfirmButton: {
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderRadius: 10
    }
})