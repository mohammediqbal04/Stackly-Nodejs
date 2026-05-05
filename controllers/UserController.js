import users from '../data/users.js';

//GET
export const getUsers = (req, res) => {
  res.status(200).json({message: 'users retrieved successfully', users: users});
}

//GET by id
export const getUsersById = (req, res) => {
  const userId = req.params.id;
  const result = users.find(u => u.id == userId);
  console.log('result------', result);

  if (!result) {
    return res.status(404).json({ message: 'no records found' });
  }
  return res.status(200).json({
    message: 'user retrieved successfully',
    data: result
  });
};

//POST 
export const AddUser = (req, res) => {
  const { name, email } = req.body;
  if(name && email ){
    const newUser = {
      id : users.length + 1,
      name,
      email
    };
    users.push(newUser);
    res.status(201).json({message: 'user added successfully', users})
  }
  else{
    res.status(400).json({message: 'user adding failed', users})
  }
}

//PUT
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.find(u => u.id === userId);

  if(userIndex === -1){
    res.status(404).json({ message: 'user not found' });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body
  };

  return res.json({message: 'user updated successfully'}, users);
}

//DELETE
export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const userIndex = users.find(u => u.id === userId);
  if(userIndex === -1){
    res.status(404).json({ message: 'user not found' });
  }
  users.splice(userIndex, 1);
  return res.json({message: 'user deleted successfully'}, users);
}