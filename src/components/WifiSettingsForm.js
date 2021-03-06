import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Progress
} from "reactstrap";
import { actions, connect } from "../store";
import { translate } from "react-i18next";

class WifiSettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        key: "",
        ssid: ""
      },
      valid: {}
    };
    this.validators = {
      ssid: value => value.length >= 8,
      key: value => value.length >= 8
    };
  }

  componentDidMount = () => {
    this.setState({ fields: this.props.wifiSettings });
  };

  onFieldChange = e => {
    const { name, value } = e.target;

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      },
      valid: {
        ...this.state.valid,
        [name]: this.validators[name](value)
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    actions.saveWifiSetting(
      this.state.fields,
      this.props.wifiSettings.device.radioType
    );
  };

  isFieldValid = name =>
    this.state.fields[name] ? this.state.valid[name] : undefined;

  render() {
    let radio = this.props.wifiSettings.device.radioType;
    let { loading, success } = this.props.state;
    let { t } = this.props;

    return (
      <React.Fragment>
        <Card style={{ flex: 1, minWidth: 300, margin: 10 }}>
          <CardBody>
            {success === radio && (
              <Alert color="success">{t("settingsSaved")}</Alert>
            )}
            {loading === radio && (
              <Progress animated color="info" value="100" />
            )}
            <Form onSubmit={this.onSubmit}>
              <Label
                for="form"
                style={{
                  marginBottom: "20px",
                  fontSize: "1.5em",
                  textAlign: "center"
                }}
              >
                {radio}
              </Label>

              <FormGroup id="form">
                <Label for="ssid">{t("ssid")}</Label>
                <Input
                  type="text"
                  id={radio + "-ssid"}
                  name="ssid"
                  valid={this.isFieldValid("ssid")}
                  placeholder="min. 8 characters"
                  onChange={this.onFieldChange}
                  value={this.state.fields.ssid}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">{t("password")}</Label>
                <Input
                  type="text"
                  id={radio + "-pass"}
                  name="key"
                  valid={this.isFieldValid("key")}
                  placeholder="min. 8 characters"
                  onChange={this.onFieldChange}
                  value={this.state.fields.key}
                />
              </FormGroup>

              <FormGroup
                style={{
                  display: "flex",
                  margin: -20,
                  marginTop: 0,
                  padding: 10
                }}
              >
                <Button
                  id={radio + "-submit"}
                  color="primary"
                  style={{
                    margin: 10
                  }}
                >
                  {t("save")}
                </Button>
              </FormGroup>

              <FormGroup
                style={{
                  display: "flex",
                  margin: -20,
                  marginTop: 0,
                  padding: 10
                }}
              />
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default connect(["loading", "success"])(translate()(WifiSettingsForm));
