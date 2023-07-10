import React, { useEffect, useState } from "react"
import Button from "./Button"
import Modal from "./Modal"
import { server_calls } from "../api/server";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetData } from "../custom-hooks/FetchData";
import { Popover } from "@mui/material";
import Weather from "../components/Weather";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'crag_name', headerName: 'Crag Name', flex: 1},
    { field: 'latitude', headerName: 'Latitude', flex: 1},
    { field: 'longitude', headerName: 'Longitude', flex: 1},
    { field: 'city', headerName: 'City', flex: 1},
    { field: 'state', headerName: 'State', flex: 1},
    { field: 'rock_type', headerName: 'Rock Type', flex: 1},
]

const DataTable = () => {
  let [ open, setOpen ] = useState(false);
  const { cragData, getData } = useGetData();
  const [ selectionModel, setSelectionModel ] = useState<string[]>([])
  const [lat, setLat] = useState<any[]>([]);
  const [long, setLong] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = () => {
    server_calls.delete(selectionModel[0]);
    getData();
    console.log(`Selection model: ${selectionModel}`)
    setTimeout( () => {window.location.reload()}, 500)
  }

// FETCH WEATHER BASED OFF YOUR CURRENT LOCATION'S GPS COORDINATES
  useEffect(() => {
    const fetchData = async () => {
        navigator.geolocation.getCurrentPosition(function(position: any) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        await fetch(`${import.meta.env.VITE_OPENWEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
            setData(result)
            console.log(result);
        });
    }
    fetchData();
  },  [lat, long])

//   POPOVER
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
        <Modal
            id={selectionModel}
            open={open}
            onClose={handleClose}
        />
        <div className='flex flex-row'>
            <div>
                <button
                    className='p-3 bg-slate-300 rounded mt-3 ml-11 hover:bg-slate-800 hover:text-white'
                    onClick={() => handleOpen()}
                >
                    Add Crag
                </button>
            </div>
            <Button onClick={handleOpen} className='p-3 bg-slate-300 rounded mt-3 ml-3 hover:bg-slate-800 hover:text-white'>Update</Button>
            <Button onClick={deleteData} className='p-3 bg-slate-300 rounded mt-3 ml-3 hover:bg-slate-800 hover:text-white'>Delete</Button>
            <Button aria-describedby={id} onClick={handleClick} className='p-3 bg-slate-300 rounded mt-3 ml-3 hover:bg-slate-800 hover:text-white'>Forecast</Button>
            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                >
                    <div className='DataTable'>
                        {(typeof data != 'undefined') ? (
                            <Weather weatherData={data} />
                        ) : (
                            <div></div>
                        )}
                    </div>
            </Popover>
        </div>
        <div className={ open ? 'hidden': 'container mx-10 my-5 flex flex-col'}
            style={{ height: 300, width: '70%'}}
        >
            <h2 className='p-3 bg-slate-300 my-2 rounded'>My Crags</h2>
            <DataGrid 
                rows={cragData} 
                columns={columns}
                checkboxSelection={true}
                onRowSelectionModelChange={ (item:any) => {
                    setSelectionModel(item)
            }}
                slotProps={{
                    pagination: {
                        rowsPerPageOptions: [5]
                    },
            }}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id: false
                        },
                    },
                }}
            />
        </div>
    </>
  )
}

export default DataTable