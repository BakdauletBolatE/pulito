import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {getOrderRatesByFilters,getOrderById } from '../../actions/orders';
import axios from 'axios';

function CreateOrderRate(props) {
    
    const [form,setForm] = useState({
        title: '',
        description: '',
        rate: 0
    })
    const [images,setImage] = useState({
        isLoading: false,
        imagesData: [],
        imageSrc: []
    })

    const [clickRate,setClickRate] = useState(false)

    const onChange = e => {
        const name = e.target.name;
        if (name === 'image') {
            setImage(prevState=>({
                        ...prevState,
                        imagesData: e.target.files
            }))

            const file = e.target.files
            
            const onStart = () => {
                console.log('start')
                setImage(prevState=>({
                    ...prevState,
                    isLoading: true
                }))
            }

            const onLoadEnd = e => {
                console.log(e.target.result);
                setImage(prevState=>({
                    ...prevState,
                    imageSrc: [...prevState.imageSrc, e.target.result],
                    isLoading: false
                }))
            }

            for (let i=0; i<file.length; i++){
                const fr = new FileReader();
                fr.readAsDataURL(file[i]);
                fr.addEventListener('loadstart', onStart);
                fr.addEventListener('loadend', onLoadEnd); 
            }            
        }
        else if (name == "rate") {
            setClickRate(true)
        }
        else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const onSubmit = () => {
        var data = new FormData();
        
        data.append('title', form.title);
        data.append('description',form.description);
        data.append('rate', parseInt(form.rate));
        data.append('order', props.order.id);

        for (let i = 0; i < images.imagesData.length; i++) {
            data.append('order_rate_images', images.imagesData[i]);
        }
        axios.post('http://127.0.0.1:8000/api/orders-rate/',data)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    }

 

    return ( <div>
        <h1>Оценить услугу?</h1>
        <div className="rating-lists">
            <input type="radio" className="btn-check" id="btn-check-outlined1" onChange={onChange} name="rate" value="1" autocomplete="off" />
            <label className="btn btn-outline-primary" htmlFor="btn-check-outlined1">1</label>
            <input type="radio" className="btn-check" id="btn-check-outlined2" onChange={onChange} name="rate" value="2" autocomplete="off" />
            <label className="btn btn-outline-primary" htmlFor="btn-check-outlined2">2</label>
            <input type="radio" className="btn-check" id="btn-check-outlined3" onChange={onChange} name="rate" value="3" autocomplete="off" />
            <label className="btn btn-outline-primary" htmlFor="btn-check-outlined3">3</label>
            <input type="radio" className="btn-check" id="btn-check-outlined4" onChange={onChange} name="rate" value="4" autocomplete="off" />
            <label className="btn btn-outline-primary" htmlFor="btn-check-outlined4">4</label>
            <input type="radio" className="btn-check" id="btn-check-outlined5" onChange={onChange} name="rate" value="5" autocomplete="off" />
            <label className="btn btn-outline-primary" htmlFor="btn-check-outlined5">5</label>
        </div>

        {clickRate ? (
            <div>
                <div>Хотите оценить нашу услугу?  <button className="btn btn-primary" type="submit">Отправить без комментариев</button></div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Загаловка</label>
                <input onChange={onChange} type="text" className="form-control" name="title" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Описание</label>
                <textarea className="form-control" onChange={onChange} name="description"></textarea>
            </div>
            <div className="mb-3">
                {images.imageSrc.length > 0 ? (
                images.imageSrc.map(item=>(
                    <img width="100px"  src={item} class="img-thumbnail" alt="..."/>
                )) 
                ) : ''}
                
            </div>
            <div className="mb-3">
                <input onChange={onChange} multiple className="form-control" type="file" name="image" />
            </div>
            <button className="btn btn-primary" onClick={onSubmit} type="btn">отправить</button>
                        </div>
                    ): ''}
        
    </div> );
}

const mapStateToProps = state => ({
    order: state.orders.order,
    user: state.auth.user
})

export default connect(mapStateToProps, {getOrderRatesByFilters,getOrderById })(CreateOrderRate);
