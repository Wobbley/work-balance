<script>
    import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'sveltestrap';
    import {humanReadableTime} from "./utility";
    import {fetchDiff} from "./diffClient"

    let endDatePlaceholder = new Date()
    let startDatePlaceholder = new Date(endDatePlaceholder)
    startDatePlaceholder.setDate(1)
    let diffRequest = {
        startDate: startDatePlaceholder.toISOString().substring(0, 10),
        endDate: endDatePlaceholder.toISOString().substring(0, 10),
        hoursInWorkday: 7.5
    }
    let loading = false;
    let diffDisplay = {};

    function getDiff2() {
        loading = true
        fetchDiff(diffRequest)
            .then(diffData => {
                diffDisplay.loggedHours = humanReadableTime(diffData.loggedHours)
                diffDisplay.expectedHours = humanReadableTime(diffData.expectedHours)
                diffDisplay.diffHours = humanReadableTime(diffData.diffHours)
                loading = false;
            })
            .catch(err => {
                console.log(err)
            })
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
            type="password"
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
      <InputGroup class="mb-1">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Hours in Workday</InputGroupText>
        </InputGroupAddon>
        <Input
            type="number"
            step="0.5"
            name="hoursInWorkday"
            id="hoursInWorkday"
            bind:value={diffRequest.hoursInWorkday}
        />
      </InputGroup>
      <Button class="mb-3" on:click={getDiff2}>Have I worked enough?</Button>
    </Col>
  </Row>
  <Row>
    <Col>
      {#if loading}
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      {:else if diffDisplay.diffHours}
        <p>
          &nbsp;&nbsp;{ diffDisplay.expectedHours } (Expected)
        </p>
        <p>
          - { diffDisplay.loggedHours } (Logged)
        </p>
        <p>
          = { diffDisplay.diffHours } (Diff)
        </p>
      {/if}
    </Col>
  </Row>
</Container>

<style>

</style>
