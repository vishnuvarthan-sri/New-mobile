import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment,Icon,GridColumn,GridRow,Input,Card} from 'semantic-ui-react';


class Main extends React.Component{
render(){
    let items = [
        {
          header: 'Project Report - April',
          description:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
          meta: 'ROI: 30%',
        },
        {
          header: 'Project Report - May',
          description:
            'Bring to the table win-win survival strategies to ensure proactive domination.',
          meta: 'ROI: 34%',
        },
        {
          header: 'Project Report - June',
          description:
            'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
          meta: 'ROI: 27%',
        },
      ]
return(
<div style={{ flexGrow: 1, display: "flex", flexFlow: "column" }}>
    <div style={{padding:30}}>
<Header color="blue">User List</Header>
<Card.Group items={items} />
</div>
</div>
);

}


}
export default Main;