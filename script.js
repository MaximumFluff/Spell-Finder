class DND extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: '', description: '', higher_level: '', page: '', range: '', components: '', ritual: '', concentration: '', casting_time: '', level: ''};
    }
    
    getValidation = () =>
    {
        fetch('5e-SRD-Spells.json')
        .then((response) => response.json())
        .then((responseData) =>
        {
            
        })
    }
    
    getSpecificSpell = () =>
    {
        let id = $("#spell").val();
        console.log(id);
        fetch('http://www.dnd5eapi.co/api/spells/' + id)
        .then((response) => response.json())
        .then((responseData) =>
        {
            console.log(responseData);
            let componentsAll = '';
            for (let i = 0; i < responseData.components.length; i++)
            {
                console.log(responseData.components[i]);
                componentsAll += responseData.components[i];
            }
            if (responseData.higher_level === undefined)
            {
                this.setState({
                    higher_level: "Does not scale to higher levels"
                })       
            }
            else
            {
                this.setState({
                    higher_level: responseData.higher_level[0]
                })
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
                
                <div>
                    <select id="spell" name="spell"></select>
                    <button type="button" onClick={this.getSpecificSpell}>Search</button>
                </div>
                <div>Name: {this.state.name}</div>
                <div>Description: {this.state.description}</div>
                <div>At Higher Levels: {this.state.higher_level}</div>
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