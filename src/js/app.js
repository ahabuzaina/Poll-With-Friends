App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,
  QuestionSet: false,

  init: function() {
    return App.initWeb3();
  },

  //web3 functionality
  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  //initiates truffle contract
  initContract: function() {
    $.getJSON("Poll.json", function(poll) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Poll = TruffleContract(poll);
      // Connect provider to interact with contract
      App.contracts.Poll.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Poll.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 0,
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });

      instance.setQuestionEvent({}, {
        fromBlock: 0,
        toBlock: "latest",
      }).watch(function(error, event) {
        console.log("question set", event)
        // Reload when a new vote is recorded
        App.render();
      });

    });
  },

  //render function on what to display to the html page
  render: function() {
    var pollInstance;
    var content = $("#content");

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    $('#link').hide();

  

    //contract data
    App.contracts.Poll.deployed().then(function(instance) {
      pollInstance = instance;
      return pollInstance.question();
    }).then(function(question) {
        var questionResult = $("#questionResult");
        questionResult.html(question);
        console.log(question);
        return pollInstance.hasPolled();
      }).then(function(hasPolled) {
        console.log(hasPolled)
        if(hasPolled){
          $('#castquestion').hide();
          $('#link').show();
        }
      return pollInstance.answersCount();
    }).then(function(answersCount) {
      var answersResults = $("#answersResults");
      answersResults.empty();

      var answersSelect = $('#answersSelect');
      answersSelect.empty();

      //sending answers to html table
      for (var i = 1; i <= answersCount; i++) {
        pollInstance.answers(i).then(function(answer) {
          var id = answer[0];
          var name = answer[1];
          var voteCount = answer[2];

          // Render answer Result
          var answerTemplate = "<tr><th>" + name + "</td><td>" + voteCount + "</td></tr>"
          answersResults.append(answerTemplate);

          // Render answer ballot option
          var answerOption = "<option value='" + id + "' >" + name + "</ option>"
          answersSelect.append(answerOption);
        });
      }
      return pollInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote by hiding form
      if(hasVoted) {
        $('#castvote').hide();
      }
    }).catch(function(error) {
      console.warn(error);
    });
  },

  //casts the vote based on html selection
  castVote: function() {
    var answerId = $('#answersSelect').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.vote(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
  },

  //sets the question based on html input
  setQ: function() {
    var questionId = $('#questionInput').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.setQuestion(questionId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
  },

  //sets the description based on html input
  setD: function() {
    var descriptionId = $('#descriptionInput').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.setDescription(descriptionId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
  },

  //sets the answers based on html input
  setAnswer1: function() {
    var answerId = $('#answerInput1').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.setAnswer(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
  },
  setAnswer2: function() {
    var answerId = $('#answerInput2').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.setAnswer(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
  },
  setAnswer3: function() {
    var answerId = $('#answerInput3').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.setAnswer(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
  },
  setAnswer4: function() {
    var answerId = $('#answerInput4').val();
    App.contracts.Poll.deployed().then(function(instance) {
      return instance.setAnswer(answerId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
