import React, {useState} from 'react';
import DishForm from "../../components/DishForm/DishForm";
import {ApiDish} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";


const NewDish: React.FC = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const createDish = async (dish: ApiDish) => {
    try {
      setCreating(true);
      await axiosApi.post('/dishes.json', dish);
      navigate('/');
    } finally {
      setCreating(false);
    }

  };

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={createDish} isLoading={creating}/>
      </div>
    </div>
  );
};

export default NewDish;