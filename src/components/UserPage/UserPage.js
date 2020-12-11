import React, {Component} from 'react';
import Data from '../db/data.json';
class UserPage extends Component{
    render(){
        return(
            <div className="card_container">
                {Data.map(list =>{
                    return(
                        <div className="card">
                            <p><span>Name</span> : <span>{list.name}</span></p>
                            <p><span>Age</span> : <span>{list.age}</span></p>
                            <p><span>Gander</span> : <span>{list.gender}</span></p>
                            <p><span>Email</span> : <span>{list.email}</span></p>
                            <p><span>Phone No</span> : <span>{list.phoneNo}</span></p>
                        </div>
                    )
                })}
                
          </div>
        )
    }
}


export default UserPage;