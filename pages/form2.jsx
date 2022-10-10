import axios from "axios";
import {
  Button,
  Container,
  Group,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { bodyChecker } from "../libs/bodyChecker";

export default function Lecture17() {
  const form = useForm({
    validate: zodResolver(bodyChecker),
    initialValues: {
      email: "",
      pwd: "",
      address: "",
      gender: "",
      plan: "",
    },
  });

  async function submitForm() {
    try {
      const resp = await axios.post("/api/register", form.values);
      if (resp.data.ok) alert("Register Successfully");
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <Container size="lg">
      <form onSubmit={form.onSubmit(() => submitForm())}>
        <div>
          <Title order={2} align="center" mt="sm" color="violet">
            CMU Marathon 2022
          </Title>

          <Group grow>
            <TextInput
              label="email"
              placeholder="Please insert email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="password"
              placeholder="6 - 12 characters"
              {...form.getInputProps("pwd")}
            />
          </Group>

          <Textarea
            label="address"
            rows="3"
            placeholder="address..."
            {...form.getInputProps("address")}
          />

          <Group grow>
            <Select
              label="Gender"
              data={[
                { value: "male", label: "Male (เพศชาย)" },
                { value: "female", label: "Female (เพศหญิง)" },
              ]}
              placeholder="Please select..."
              {...form.getInputProps("gender")}
            />

            <Select
              label="Plan"
              data={[
                { value: "full", label: "Full Marathon (42.195 KM)" },
                { value: "half", label: "Half Marathon (21.1 KM)" },
                { value: "mini", label: "Mini Marathon (10.5 KM)" },
              ]}
              placeholder="Please select..."
              {...form.getInputProps("plan")}
            />
          </Group>

          <Button type="submit" mt="sm" color="violet">
            Register
          </Button>
        </div>
      </form>
    </Container>
  );
}
