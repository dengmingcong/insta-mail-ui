"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLogin } from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import Image from "next/image";

export default function Login() {
  const { mutate: login } = useLogin();

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <ThemedTitleV2
          collapsed={false}
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
        />
        <Button
          style={{ width: "240px" }}
          variant="contained"
          size="large"
          onClick={() => login({})}
        >
          Sign in
        </Button>
        <Typography align="center" color={"text.secondary"} fontSize="14px" display="flex" alignItems="center" justifyContent="center">
          Powered by
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            width={24}
            height={24}
            style={{ padding: "0 5px", verticalAlign: "middle" }}
            alt="Microsoft"
          />
          Microsoft
        </Typography>
      </Box>
    </Container>
  );
}
