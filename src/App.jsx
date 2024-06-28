import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [country, setCountry] = useState([]);
  const [con, setCon] = useState("")
  const [state, setState] = useState([]);
  const [stateI, setStateI] = useState("")
  const [city, setCity] = useState([]);
  const [cityId,setCityId] = useState("");
  console.log(con);

  const GetCountry = async () => {
    try {
      let all = await axios.get(`http://localhost:4000/country`);
      setCountry(all.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const GetState = async () => {
    try {
      let all = await axios.get(`http://localhost:4000/state`);
      let Fstate = all.data.filter(val => val.country_id == con);
      setState(Fstate);
      console.log(Fstate);
    } catch (error) {
      console.log(error);
      return false
    }
  }

  const GetCity = async () => {
    try {
      let all = await axios.get(`http://localhost:4000/city`);
      let Fcity = all.data.filter(val => val.state_id == stateI);
      setCity(Fcity);
    } catch (error) {
      console.log(error);
      return false
    }
  }

  useEffect(() => {
    GetCountry()
  }, [])


  useEffect(() => {
    GetState();

  }, [con])

  useEffect(() => {
   GetCity()

  }, [stateI])

  return (
    <>
   
      <div className=" w-50 mx-auto">
        <section className="csc-section ">
          <div className="container">
            <div className="row  ">
            <h1 align="center" className="pt-4">Dynemic Dependent</h1>
              <div className="select w-100 pt-2 ">
              <form className=" w-100 h-100 m-1 bg-warning  p-4 shadow rounded-5">
                <fieldset className="bg-white py-3 px-3 my-3 rounded-4 shadow ">
                  <label className="fs-4 fw-bold" htmlFor="country">Country:</label><br /><br />
                  <select className="w-50 rounded-5 py-1 px-1" onChange={(e) => setCon(e.target.value)} value={con}>
                    <option value ="">--- Select Your Country --</option>
                    {
            country.map((C,i) => {
              return <option key={C.i} value={C.country_id}>{C.country_name}</option>
            })
          }
                  </select>
                </fieldset>
                <fieldset className="bg-white py-3 px-3 my-3 rounded-4 shadow ">
                  <label className="fs-4 fw-bold" htmlFor="state">State:</label><br /><br />
                  <select className="w-50 rounded-5 py-1 px-3" onChange={(e) => setStateI(e.target.value)} value={stateI}>
                    <option value="">-- Select Your State --</option>
                    {
            state.map((S,i) => {
              return <option key={i} value={S.state_id}>{S.state_name}</option>
            })
          }

                  </select>
                </fieldset>
                <fieldset className="bg-white py-3 px-3 my-3 rounded-4 shadow ">
                  <label className="fs-4 fw-bold" htmlFor="city">City:</label><br /><br />
                  <select className="w-50  rounded-5 py-1 px-3" name="city" id="city">
                    <option value="">-- Select Your City --</option>
                    {
            city.map((Ct) => {
              return <option key={Ct.id} value={Ct.city_Id}>{Ct.city_name}</option>
            })
          }
                  </select>
                </fieldset>
              </form>
              </div>
            </div>
          </div>

        </section>

      </div>
    </>
  )
}

export default App
