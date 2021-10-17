import './search-modal.css';

function SearchModal(props) {
    const {users,setActiveUser} = props;
    return ( 
        <div >
            <div className="search-container">
            {users.map(item => (
                <div className="search-group" onClick={()=>setActiveUser(item.email,item.number_phone,item.name)}>
                    <li className="search-item">Номер: {item.number_phone}</li>
                    <li className="search-item">Имя: {item.name}</li>
                    <li className="search-item">Почта: {item.email}</li>
                </div>
                )
            )}
            </div>
        </div>
     );
}

export default SearchModal;