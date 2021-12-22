import axios from 'axios';
import React from 'react';

//Nueva máquina con docker! 129.151.100.76
const url = "http://129.151.100.76:8080/api/user/all";
//const url= "http://129.151.98.9:8080/api/user/all";
//const url= "http://localhost:8080/api/user/all"

class GetUsers extends React.Component{
  state={
    data:[]
  }

  GetAllUsers=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    })
  }

  componentDidMount(){
    this.GetAllUsers();
  }



}

export default GetUsers;