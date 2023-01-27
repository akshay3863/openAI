import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [text, setText] = useState("");
  const [state, setState] = useState("");
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const onFormSubmit = () => {
    setIsLoadingPage(true);
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `Write a Blog about ${text}`,
        temperature: 0,
        max_tokens: 10000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
      .then((res) => {
        setState(res.data.choices[0].text);
        setIsLoadingPage(false);
      })
      .catch((err) => {
        setIsLoadingPage(false);
      });
  };
  return (
    <Row className="App">
      <Col md={4}>
        <div className="p-5">
          <FloatingLabel label="Search Blog Title" >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "500px" }}
              onChange={(e) => setText(e.target.value)}
            />
          </FloatingLabel>
          <Button
            variant="primary"
            type="submit"
            className="mx-auto w-100 mt-3"
            disabled={isLoadingPage}
            onClick={onFormSubmit}
          >
            Get Data
          </Button>
        </div>
      </Col>
      <Col md={8} style={{ maxWidth: 800,  }} className="p-5">
        <Card  className="m-auto" style={{ height: "500px" }}>
          <Card.Body>
            <Card.Text>
              {isLoadingPage ? (
                <Spinner animation="border" />
              ) : (
                <p style={{ textAlign: "center" }}>{state}</p>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
          <CopyToClipboard
            text={state}
          >
            <Button
              variant="primary"
              type="submit"
              className="mx-auto w-100 mt-2"
            >
              COPY 
            </Button>
          </CopyToClipboard>
      </Col>
    </Row>
  );
}

export default App;
