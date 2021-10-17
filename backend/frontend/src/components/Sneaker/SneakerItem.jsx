import SneakerImg from './SneakerImg';

function SneakerItem({item,removeShoes}) {
    return ( 
        <div className="sneaker-item">
             <SneakerImg isDefect={item.isDefect}></SneakerImg>
            <h2 className="sneaker-item__name">{item.name}</h2>
            <h2 className="sneaker-item__mark">{item.mark}</h2>
            <h3 className="sneaker-item__orderPrice">{item.orderPrice} ₸</h3>
            {removeShoes ? (
                 <button className="btn btn-danger sneaker-item__delete" type="button" onClick={()=>removeShoes(item.unicId)}>Удалить</button>
            ): ''}
           
           
        </div>
     );
}

export default SneakerItem;