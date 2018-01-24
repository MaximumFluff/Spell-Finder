class DND extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', description: '', page: '', range: '', components: '', ritual: '', concentration: '', casting_time: '', level: ''};
    }
    
    getData = () =>
    {
        fetch('http://www.dnd5eapi.co/api/spells')
        .then((response) => response.json())
        .then((responseData) => {
            let nameOfSpell = document.getElementById('search').value;
            console.log(responseData);
            for (let i = 0; i < responseData.results.length; i++)
            {
                //console.log(i);
                if (nameOfSpell == responseData.results[i].name)
                {
                    let spellId = i + 1;
                    this.getSpecificSpell(spellId);
                }
            }
        });
    }

    getSpecificSpell = (id) =>
    {
        fetch('http://www.dnd5eapi.co/api/spells/' + id)
        .then((response) => response.json())
        .then((responseData) =>
        {
            let componentsAll = '';
            for (let i = 0; i < responseData.components.length; i++)
            {
                console.log(responseData.components[i]);
                componentsAll += responseData.components[i];
            }
            this.setState({
                name: responseData.name,
                description: responseData.desc[0],
                page: responseData.page,
                range: responseData.range,
                components: componentsAll,
                ritual: responseData.ritual,
                concentration: responseData.concentration,
                casting_time: responseData.casting_time,
                level: responseData.level
            });
        });
    }
    
    render() {
        return (
            <div>
                <img src="ampersand.png"></img>
                <h1>Dungeons and Dragons 5th Edition Spell Finder</h1>
                <input type="text" id="search" />
                <button type="button" onClick={this.getData}>Search</button>
                <div>Name: {this.state.name}</div>
                <div>Description: {this.state.description}</div>
                <div>Page: {this.state.page}</div>
                <div>Range: {this.state.range}</div>
                <div>Components: {this.state.components}</div>
                <div>Ritual: {this.state.ritual}</div>
                <div>Concentration: {this.state.concentration}</div>
                <div>Casting Time: {this.state.casting_time}</div>
                <div>Level: {this.state.level}</div>
            </div>
        );
    }
}

ReactDOM.render(<DND />, document.getElementById('root'));