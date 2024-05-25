"use client";
import React from "react";

// component
import UserForm from "@/components/form/user";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const App: React.FC = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
