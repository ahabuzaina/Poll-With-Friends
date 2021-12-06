pragma solidity ^0.5.16;

contract Poll {
    // Model a Answer
    struct Answer {
        uint id;
        string name;
        uint voteCount;
    }

    string public question;

    string public description;

    bool public hasPolled = false;
    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Answers
    // Fetch Answer
    mapping(uint => Answer) public answers;
    // Store answers Count
    uint public answersCount;

    // voted event
    event votedEvent (
        uint indexed _answerId
    );

    event setQuestionEvent (
        string _questionId
    );

        event setDescriptionEvent (
        string _descriptionId
    );

    constructor() public {
        question = "";
    }

    function addAnswer (string memory answer) private {
        answersCount ++;
        answers[answersCount] = Answer(answersCount, answer, 0);
    }

    function setQuestion (string memory _questionId) public {
        question = _questionId;
        hasPolled = true;
        emit setQuestionEvent(_questionId);
    }

    function setDescription (string memory _descriptionId) public {
        description = _descriptionId;
        emit setQuestionEvent(_descriptionId);
    }

    function setAnswer (string memory _answerId) public {
        addAnswer(_answerId);
    }


    function vote (uint _answerId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid answer
        require(_answerId > 0 && _answerId <= answersCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update answer vote Count
        answers[_answerId].voteCount ++;

        // trigger voted event
        emit votedEvent(_answerId);
    }
}