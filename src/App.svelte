<script>
    import {Input, Container, InputGroup, InputGroupAddon, InputGroupText, Button, Row, Col} from 'sveltestrap';

    let endDatePlaceholder = new Date()
    let startDatePlaceholder = new Date(endDatePlaceholder)
    startDatePlaceholder.setDate(1)
    let diffRequest = {
        startDate: startDatePlaceholder.toISOString().substring(0, 10),
        endDate: endDatePlaceholder.toISOString().substring(0, 10)
    }
    let loading = false;
    let diffResponse = {};

    function getDiff() {
        loading = true
        fetch('https://work-diff.azurewebsites.net/diff', {
            method: 'POST',
            body: JSON.stringify(diffRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error("Faaaailed!")
            }
            return res.json()
        }).then(data => {
            diffResponse.loggedHours = formatTime(data.loggedHours)
            diffResponse.expectedHours = formatTime(data.expectedHours)
            diffResponse.diffHours = formatTime(data.diffHours)
            loading = false;
        }).catch(err => {
            console.log(err)
        })
    }

    function formatTime(hoursAsDecimal) {
        // Check sign of given hoursAsDecimal
        var sign = (hoursAsDecimal >= 0) ? 1 : -1;

        // Set positive value of hoursAsDecimal of sign negative
        hoursAsDecimal = hoursAsDecimal * sign;

        // Separate the int from the decimal part
        var hour = Math.floor(hoursAsDecimal);
        var decpart = hoursAsDecimal - hour;

        var min = 1 / 60;
        // Round to nearest minute
        decpart = min * Math.round(decpart / min);

        var minute = Math.floor(decpart * 60) + '';

        // Add padding if need
        if (minute.length < 2) {
            minute = '0' + minute;
        }

        // Add Sign in final result
        sign = sign == 1 ? '' : '-';

        // Concat hours and minutes
        let time = sign + hour + ':' + minute;

        return time;
    }
</script>

<head>
  <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <title>Balance</title>
</head>

<Container>
  <Row>
    <Col>
      <InputGroup class="mb-1">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Workspace ID</InputGroupText>
        </InputGroupAddon>
        <Input
            type="text"
            name="workspaceId"
            id="workspaceId"
            placeholder="Enter your workspace ID"
            bind:value={diffRequest.workspaceId}/>
      </InputGroup>
      <InputGroup class="mb-1">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>API Key</InputGroupText>
        </InputGroupAddon>
        <Input
            type="text"
            name="apiKey"
            id="apiKey"
            placeholder="Enter your API Key"
            bind:value={diffRequest.apiKey}>
        </Input>
      </InputGroup>
      <InputGroup class="mb-1">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Start Date</InputGroupText>
        </InputGroupAddon>
        <Input
            type="date"
            name="startDate"
            id="startDate"
            bind:value={diffRequest.startDate}
        />
      </InputGroup>
      <InputGroup class="mb-1">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>End Date</InputGroupText>
        </InputGroupAddon>
        <Input
            type="date"
            name="endDate"
            id="endDate"
            bind:value={diffRequest.endDate}
        />
      </InputGroup>
      <Button class="mb-3" on:click={getDiff}>Have I worked enough?</Button>
    </Col>
  </Row>
  <Row>
    <Col>
      {#if loading}
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      {:else if diffResponse.diffHours}
        <p>
          &nbsp;&nbsp;{ diffResponse.expectedHours } (Expected)
        </p>
        <p>
          - { diffResponse.loggedHours } (Logged)
        </p>
        <p>
          = { diffResponse.diffHours } (Diff)
        </p>
      {/if}
    </Col>
  </Row>
</Container>

<style>

</style>
