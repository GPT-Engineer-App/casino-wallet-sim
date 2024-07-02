import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://api.nexuspay.cloud/user/profile", {
          headers: {
            "Authorization": "Bearer W6Bqqa2nhGmcWKFg5trryaaQjtOspejlo33Oep4="
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
        localStorage.setItem("profileData", JSON.stringify(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const storedProfileData = localStorage.getItem("profileData");
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
      setLoading(false);
    } else {
      fetchProfileData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form>
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobilenumber", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                value={profileData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default Profile;