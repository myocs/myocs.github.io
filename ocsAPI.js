class OCS {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
      'Content-Type': 'application/json'
    };
  }

  async login() {
    const response = await fetch('https://oregon.hospitalcapacity.com/login', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ username: this.username, password: this.password })
    });

    
  }

  async getCapacitySystemSource() {
    const data = { heirarchy: 'state', sortData: 'default', view: 'divert' };
    const response = await fetch('https://oregon.hospitalcapacity.com/api/ah/tiledata/CapacitySystemSource', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });

    //if (!response.ok) {
    //  throw new Error(`getCapacitySystemSource failed with status ${response.status}`);
    //}

    const jsonResponse = await response.json();
    return jsonResponse.body.data.hierarchies[0].divertViewData;
  }
}
async function myFunction(u, p) {
  (async () => {
    const ocs = new OCS(u, p);
    await ocs.login();
    const capacitySystemSource = await ocs.getCapacitySystemSource();
    console.log(capacitySystemSource);
  })();
}
