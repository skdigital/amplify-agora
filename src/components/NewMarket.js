import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createMarket } from '../graphql/mutations';
// prettier-ignore
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'

import { UserContext } from '../App';

class NewMarket extends React.Component {
  state = {
    addMarketDialog: false,
    tags: ['Arts', 'Technology', 'Crafts', 'Entertainment', 'Web Dev'],
    selectedTags: [],
    options: [],
    name: ''
  };

  handleAddMarket = async user => {
    try {
      this.setState({ addMarketDialog: false });
      const input = {
        name: this.state.name,
        owner: user.username,
        tags: this.state.selectedTags
      };
      const res = await API.graphql(graphqlOperation(createMarket, { input }));
      console.log({ res });
      console.info(`created market: id ${res.data.createMarket.id}`);
      this.setState({ name: '', selectedTags: [] });
    } catch (err) {
      console.error('Error adding new market', err);
      Notification.error({
        title: 'Error',
        message: `${err.message || 'Error adding market'}`
      });
    }
  };

  handleFilterTags = query => {
    const options = this.state.tags
      .map(tag => ({ value: tag, label: tag }))
      .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()));
    this.setState({ options });
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => (
          <>
            <div className="market-header">
              <h1 className="market-title">
                Create Your Market
                <Button
                  onClick={() => this.setState({ addMarketDialog: true })}
                  type="text"
                  icon="edit"
                  className="market-title-button"
                />
              </h1>
            </div>

            <Dialog
              title="Create New Market"
              visible={this.state.addMarketDialog}
              onCancel={() => this.setState({ addMarketDialog: false })}
            >
              <Dialog.Body>
                <Form labelPosition="top">
                  <Form.Item label="Add Market Name">
                    <Input
                      placeholder="Market Name"
                      trim={true}
                      onChange={name => this.setState({ name })}
                      value={this.state.name}
                    />
                  </Form.Item>
                  <Form.Item label="Add Tags">
                    <Select
                      filterable={true}
                      multiple={true}
                      placeholder="Tags"
                      onChange={selectedTags => this.setState({ selectedTags })}
                      remoteMethod={this.handleFilterTags}
                      remote={true}
                    >
                      {this.state.options.map(option => (
                        <Select.Option
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  onClick={() => this.setState({ addMarketDialog: false })}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!this.state.name}
                  onClick={() => this.handleAddMarket(user)}
                  type="primary"
                >
                  Add
                </Button>
              </Dialog.Footer>
            </Dialog>
          </>
        )}
      </UserContext.Consumer>
    );
  }
}

export default NewMarket;
