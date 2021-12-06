var Poll = artifacts.require("./Poll.sol");

contract("Poll", function(accounts) {
  var PollInstance;

  //test for # of answers created
  it("Creates 4 Answers", function() {
    return Poll.deployed().then(function(instance) {
      return instance.answersCount();
    }).then(function(count) {
      assert.equal(count, 4);
    });
  });

  //test for question with correct value
  it("Creates correct question", function() {
    return Poll.deployed().then(function(instance) {
      return instance.question();
    }).then(function(question) {
      assert.equal(question, "test");
    });
  });

  //test for answers with correct value
  it("answers have correct values", function() {
    return Poll.deployed().then(function(instance) {
      PollInstance = instance;
      return PollInstance.answers(1);
    }).then(function(answer) {
      assert.equal(answer[0], 1, "contains the correct id");
      assert.equal(answer[1], "answer 1", "contains the correct answer");
      assert.equal(answer[2], 0, "contains the correct number of votes");
      return PollInstance.answers(2);
    }).then(function(answer) {
      assert.equal(answer[0], 2, "contains the correct id");
      assert.equal(answer[1], "answer 2", "contains the correct answer");
      assert.equal(answer[2], 0, "contains the correct number of votes");
      return PollInstance.answers(3);
    }).then(function(answer) {
        assert.equal(answer[0], 3, "contains the correct id");
        assert.equal(answer[1], "answer 3", "contains the correct answer");
        assert.equal(answer[2], 0, "contains the correct number of votes");
        return PollInstance.answers(4);
      }).then(function(answer) {
        assert.equal(answer[0], 4, "contains the correct id");
        assert.equal(answer[1], "answer 4", "contains the correct answer");
        assert.equal(answer[2], 0, "contains the correct number of votes");
      });
  });

    //test for voting
  it("allows user to vote", function() {
    return Poll.deployed().then(function(instance) {
      PollInstance = instance;
      answerId = 1;
      return PollInstance.vote(answerId, { from: accounts[0] });
    }).then(function(receipt) {
      assert.equal(receipt.logs.length, 1, "an event was triggered");
      assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
      assert.equal(receipt.logs[0].args._answerId.toNumber(), answerId, "the answer id is correct");
      return PollInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "voter marked as voted");
      return PollInstance.answers(answerId);
    }).then(function(answer) {
      var voteCount = answer[2];
      assert.equal(voteCount, 1, "increments answer's votecount");
    })
  });

});