import React from 'react';
import '../components.css';
class ItineraryTable extends React.Component {
   render() {
      return (
        <div className="basicTable">
            <table class="table1 table-dark" border="1" cellspacing="0">
            <thead>
                <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Group Name</th>
                <th scope="col">Date</th>
                <th scope="col">Schedule</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr >
                <th scope="row">1</th>
                <td >Trabuco Hills Marching Unit</td>
                <td>Friday, November 27th, 2020</td>
                <td>
                    <table className="notes">
                        <tr>
                        <th scope="col">Time</th>
                        <th scope="col">Note</th>
                        </tr>
                        <tr>
                            <td>07:15:AM</td>
                            <td>Meet Chaperones & Guides in hotel lobby, walk to breakfast</td>
                        </tr>
                        <tr>
                            <td>07:30:AM</td>
                            <td>Breakfast Buffet at Planet Hollywood Return to rooms to pack</td>
                        </tr>
                        <tr>
                            <td>09:00:AM</td>
                            <td>Hotel check-out, bring baggage to coaches 4-Rides SUBWAY from/to Times Square (with Guides) GROUP 1 & 2 (AM) / GROUP 3 & 4 (PM) Broadway Workshop / Q&A Becoming an Actor “The Audition” GROUP 3 & 4 (AM) / GROUP 1 & 2 (PM) Visit St Paul’s Chapel Visit the National 9/11 Memorial & Museum at the World Trade Center Lunch on location in chaperone groups (Stipend $15.00)</td>
                        </tr>
                        <tr>
                            <td>04:45:PM</td>
                            <td>Pre-Performance Dinner at Dallas BBQ</td>
                        </tr>
                    </table>
                </td>
                <td><button className="editButton">Edit</button></td>
                </tr>
                <tr >
                <th scope="row">2</th>
                <td>Trabuco Hills Marching Unit</td>
                <td>Thursday, November 26th, 2020</td>
                <td></td>
                <td><button className="editButton">Edit</button></td>
                </tr>
                <tr >
                <th scope="row">3</th>
                <td>Trabuco Hills Marching Unit</td>
                <td>Wednesday, November 25th, 2020</td>
                <td></td>
                <td><button className="editButton">Edit</button></td>
                </tr>
                <tr >
                <th scope="row">4</th>
                <td>Trabuco Hills Marching Unit</td>
                <td>Tuesday, November 24th, 2020</td>
                <td></td>
                <td><button className="editButton">Edit</button></td>
                </tr>
            </tbody>
            </table>
         </div>
      );
   }
}
export default ItineraryTable