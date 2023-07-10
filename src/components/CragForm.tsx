import Button from './Button'
import Input from './Input'

import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux'
import { chooseCrag, chooseLatitude, chooseLongitude, chooseCity, chooseState, chooseRock } from '../redux/slices/RootSlice'

interface CragFormProps {
    id?: string[]
    onClose: () => void;
}

const CragForm = (props:CragFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
        server_calls.update(props.id[0], data)
        console.log(`Updated: ${ data.crag_name } ${ props.id }`)
        setTimeout(() => {window.location.reload()}, 500);
        event.target.reset()
    } else {
        dispatch(chooseCrag(data.crag_name));
        dispatch(chooseLatitude(data.latitude));
        dispatch(chooseLongitude(data.longitude));
        dispatch(chooseCity(data.city));
        dispatch(chooseState(data.state));
        dispatch(chooseRock(data.rock_type));

        server_calls.create(store.getState())
        setTimeout(() => {window.location.reload()}, 500);
        event.target.reset()

        props.onClose();
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <span className='text-left grid gap-2 grid-cols-2 grid-rows-3'>
                <span><p className='ml-3'>Crag Name</p><Input {...register('crag_name')} name='crag_name' placeholder='Crag Name'/></span>
                <span><p className='ml-3'>Latitude</p><Input {...register('latitude')} name='latitude' placeholder='Latitude'/></span>
                <span><p className='ml-3'>Longitude</p><Input {...register('longitude')} name='longitude' placeholder='Longitude'/></span>
                <span><p className='ml-3'>City</p><Input {...register('city')} name='city' placeholder='City'/></span>
                <span><p className='ml-3'>State</p><Input {...register('state')} name='state' placeholder='State'/></span>
                <span><p className='ml-3'>Rock Type</p><Input {...register('rock_type')} name='rock_type' placeholder='Rock Type'/></span>
                <div><Button className='flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white'>Submit</Button></div>
            </span>
        </form>
    </div>
  )
}

export default CragForm