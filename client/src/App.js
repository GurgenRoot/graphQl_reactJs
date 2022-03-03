import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {

    const [newUser] = useMutation(CREATE_USER);
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
    const {data:oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
        variables: {
            id: 1646324076519
        }
    })
  const [users, setUsers] = useState([]);

  const [username, setUserName] = useState('');
  const [age, setAge] = useState(0);

  console.log(oneUser, 'oneUser');

  useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
  }, [data])

  if (loading) {
      return <h1>...Loading</h1>
  }


    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data, 'data then')
            setUserName('')
            setAge(0)
        })
    }

    const getAll = e => {
      e.propertyIsEnumerable()
      refetch()
    }
  return (
    <div className="App">
        <form>
            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)}/>
            <input type="number" value={age} onChange={(e) => setAge(+e.target.value)}/>
            <div className='btns'>
                <button onClick={(e) => addUser(e)}>create</button>
                <button onClick={(e) => getAll(e)}>get</button>
            </div>
        </form>
        <div>
            {
                users.map(user => {
                    return(
                        <div key={user.id}>
                            {user.id} {user.username} {user.age}
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
}

export default App;
