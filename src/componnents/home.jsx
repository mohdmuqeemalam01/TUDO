import { useEffect, useState } from "react";
import axios from 'axios'
export default function Home() {
    const [val, setVal] = useState([])
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [age, setAge] = useState("");
    const [study, setStudy] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [editStudy, setEditStudy] = useState("");
  const handleEdit = (item) => {
    // console.log("Edit clicked", item);

    setEditId(item.id);
    setEditName(item.name);
    setEditAge(item.age);
    setEditStudy(item.study);
};
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dat = await axios.get('http://localhost:3000/home');

                setVal(dat.data);

            }
            catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

    },)


  const updateData = async (id) => {
  try {
    await axios.put(`http://localhost:3000/home/${id}`, {
      name: editName,
      age: editAge,
      study: editStudy,
    });
    

    // setVal(
    //   val.map((item) =>
    //     item.id === id
    //       ? {
    //           ...item,
    //           name: editName,
    //           age: editAge,
    //           study: editStudy,
    //         }
    //       : item
    //   )
    // );

    setEditId(null);

  } catch (err) {
    console.log(err);
  }
};

    const addData = async () => {
        try {
            const val = await axios.post('http://localhost:3000/home', {
                id: id,
                name: name,
                age: age,
                study: study
            })


        }

        catch (err) {
            console.log(err)
        }


    }
    const deleData = async (id) => {
        console.log(id);

        await axios.delete(`http://localhost:3000/home/${id}`);
    };


    // console.log(val)
    if (loading) {
        return <h1 className="text-center mt-5">Loading...</h1>;
    }

    if (error) {
        return <h1 className="text-center mt-5">{error}</h1>;
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-3 sm:p-5 md:p-8">

            {/* Header */}
            <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl text-green-500 mb-8">
                TODO APP
            </h1>

            {/* Form */}
            <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                    <input
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="ID"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={study}
                        onChange={(e) => setStudy(e.target.value)}
                        placeholder="Class"
                    />

                    <button
                        onClick={addData}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition duration-300"
                    >
                        Save Student
                    </button>

                </div>
            </div>

            {/* Table Section */}
            <div className="mt-8 max-w-7xl mx-auto">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            Student Management
                        </h2>
                        <p className="text-blue-100 text-sm">
                            Manage student records
                        </p>
                    </div>

                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">

                            <thead>
                                <tr className="bg-slate-50 border-b">
                                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                                        ID
                                    </th>

                                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                                        Name
                                    </th>

                                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                                        Age
                                    </th>

                                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                                        Class
                                    </th>

                                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {val.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 hover:bg-blue-50 transition duration-300"
                                    >
                                        <td className="px-4 py-4">

                                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                                                #{item.id}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            {editId === item.id ? (
                                                <input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                item.name
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            {editId === item.id ? (
                                                <input
                                                    value={editAge}
                                                    onChange={(e) => setEditAge(e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                item.age
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            {editId === item.id ? (
                                                <input
                                                    value={editStudy}
                                                    onChange={(e) => setEditStudy(e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                item.study
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            {editId === item.id ? (
                                                <button
                                                    onClick={() => updateData(item.id)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Update
                                                </button>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => deleData(item.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

        </div>
    );

}