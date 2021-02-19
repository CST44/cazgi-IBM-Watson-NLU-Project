import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        /*let output = "";*/
        let listOfEventsAsArray = Object.entries(this.props.emotions);
        /*let eventDetails = listOfEventsAsArray.map((eventDetial)=>{
            output += "{"+eventDetial[0]+"} {"+eventDetial[1]+"}\n"
            //output += "<tr><td>"+eventDetial[0]+"</td><td>"+eventDetial[1]+"</td></tr>"
        })
        output+="";*/
      return (
        <div>
          {/*You can remove this line and the line below. }
            {JSON.stringify(this.props.emotions)*/}
          
          <table className="table table-bordered">
            <tbody>
                {   
                    listOfEventsAsArray.map((eventDetial)=>{
                            return (
                                <tr>
                                    <td>{eventDetial[0]}</td>
                                    <td>{eventDetial[1]}</td>
                                </tr>
                            )})
                }
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
