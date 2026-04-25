import React, { useState } from "react";


  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h2>Student Profile</h2>
      <div className="card" style={{ padding: "1.5rem", marginTop: "1rem" }}>
        {Object.keys(profile).map((key) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "0.25rem",
                textTransform: "capitalize",
              }}
            >
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={tempProfile[key]}
                onChange={handleChange}
                className="form-input"
                style={{ width: "100%", padding: "0.5rem" }}
              />
            ) : (
              <p style={{ margin: 0 }}>{profile[key]}</p>
            )}
          </div>
        ))}

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          {isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button className="btn" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
