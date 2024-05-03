import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  Modal,
  View,
  FlatList,
  Pressable,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { AntDesign } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'
import { MaterialIcons } from '@expo/vector-icons';
// then use it
/**
 * https://docs.expo.dev/guides/icons/, https://icons.expo.fyi/Index
 * https://reactnavigation.org/docs/header-buttons/
 * https://reactnative.dev/docs/modal
 * https://reactnative.dev/docs/keyboardavoidingview
 */

const storageTodoListKey = '@todo-list-key'

const RenderItem = ({
  todoItem,
  onDelete,
}: {
  todoItem: TodoItem
  onDelete: (item: TodoItem) => void
}) => (
  <Swipeable
    renderRightActions={(
      progressAnimatedValue: Animated.AnimatedInterpolation<string | number>
    ) => (
      <RightSwipeActions
        item={todoItem}
        onDelete={onDelete}
        progress={progressAnimatedValue}
      />
    )}
  >
    <View style={styles.item}>
      <Text style={styles.itemText} numberOfLines={1} selectable>
        {todoItem.description}
      </Text>
    </View>
  </Swipeable>
)

const RightSwipeActions = ({
  item,
  onDelete,
  progress,
}: {
  item: TodoItem
  onDelete: (item: TodoItem) => void
  progress: Animated.AnimatedInterpolation<number>
}) => {
  const transform = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  })
  return (
    <Animated.View
      style={[
        styles.item,
        {
          backgroundColor: 'lightcoral',
          alignItems: 'flex-end',
          transform: [{ translateX: transform }],
        },
      ]}
    >
      <TouchableOpacity onPress={() => onDelete(item)}>
        <AntDesign name="delete" size={18} color="black" />
      </TouchableOpacity>
    </Animated.View>
  )
}

type TodoItem = {
  id: number
  title: string
  description: string
}

type TodoListScreenProps = NativeStackScreenProps<
  ToDoStackParamList,
  'TodoList'
>

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [modalVisible, setModalVisible] = React.useState(true)
  const [todoItemList, setTodoItemList] = React.useState<TodoItem[]>([])
  const [todoItemDescription, setTodoItemDescription] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="pluscircle" size={24} color="darkseagreen" />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  React.useEffect(() => {
    const getTodoItems = async () => {
      const savedItems = await AsyncStorage.getItem(storageTodoListKey)
      if (savedItems === null) {
        return
      }
      const items = JSON.parse(savedItems) || []
      setTodoItemList(items)
    }
    getTodoItems()
  }, [])

  const handleAddItem = async () => {
    if (!todoItemDescription) {
      alert('Descrição da tarefa inválida!')
      return
    }

    if (!todoItemList.length) {
      const arrTodo = [
        {
          id: 1,
          title: '',
          description: todoItemDescription,
        },
      ]
      await AsyncStorage.setItem(storageTodoListKey, JSON.stringify(arrTodo))

      setTodoItemList(arrTodo)
      setTodoItemDescription('')
      return
    }

    const todoItemListCopy = [...todoItemList]

    const lastItemIdPlusOne = todoItemList[todoItemList.length - 1].id + 1

    const newItem: TodoItem = {
      id: lastItemIdPlusOne,
      title: '',
      description: todoItemDescription,
    }

    todoItemListCopy.push(newItem)

    await AsyncStorage.setItem(
      storageTodoListKey,
      JSON.stringify(todoItemListCopy)
    )

    setTodoItemList(todoItemListCopy)
    setTodoItemDescription('')
  }

  const handleDeleteItem = (item: TodoItem) => {
    const index = todoItemList.findIndex((todo) => todo.id === item.id)

    const todoItemListCopy = todoItemList.toSpliced(index, 1)

    setTodoItemList(todoItemListCopy)
    AsyncStorage.setItem(storageTodoListKey, JSON.stringify(todoItemListCopy))
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AntDesign name="close" size={18} color="black" />
              
            </Pressable>
            <Text style={styles.modalText}>Descreva a tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={todoItemDescription}
              onChangeText={(textValue) => setTodoItemDescription(textValue)}
              multiline={true}
              numberOfLines={4}
            />
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleAddItem}
              >
                <Text style={styles.textStyle}>Adicionar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <FlatList
        style={{ width: '100%' }}
        data={todoItemList}
        renderItem={({ item }) => (
          <RenderItem todoItem={item} onDelete={handleDeleteItem} />
        )}
        keyExtractor={(item, i) => (item.id ?? i).toString()}
        contentContainerStyle={{ gap: 5, marginTop: 5 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    minWidth: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginLeft: 'auto',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
})

export default TodoListScreen
