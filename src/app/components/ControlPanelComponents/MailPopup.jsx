import React from 'react';
import { Button, Header, Form, Modal, TextArea } from 'semantic-ui-react'

class MailPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            mailIds: props.mailIds
        };
    }

    show = () => {
        this.setState({ open: true });
    }

    sendAndClose = () => {
        this.setState({ mailIds: this.state.mailIds, open: false });
        this.props.sendMailAndClosePopup(this.state.mailIds);
    }

    close = () => {
        this.setState({ open: false });
        this.props.closePopup();
    }

    handleMailIdChange = (e) => {
        this.setState({ mailIds: e.target.value });
    }

    render() {

        return (
            <div>
                <Modal size="small" dimmer="blurring" open={this.state.open} onClose={this.close}>
                    <Modal.Header>Enter email ids</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <TextArea placeholder="Enter multiple mail with semicolon" onChange={this.handleMailIdChange} style={{ width: 300, height: 200 }} />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Nope
                        </Button>
                        <Button positive icon='checkmark' labelPosition='right' content="Send" onClick={this.sendAndClose} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default MailPopup