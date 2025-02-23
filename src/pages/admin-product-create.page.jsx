import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useCreateProductMutation } from "@/lib/api";

const formSchema = z.object({
  categoryId: z.string().min(1, "Category ID is required"),
  name: z.string().min(1, "Product name is required"),
  image: z.string().min(1, "Image URL is required"),
  price: z.preprocess((val) => (typeof val === "string" ? parseFloat(val) : val), z.number().min(1, "Price is required")),
  description: z.string().min(1, "Description is required"),
});

const AdminProductCreatePage = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      name: "",
      image: "",
      price: 0,
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      await createProduct({
        categoryId: values.categoryId,
        name: values.name,
        image: values.image,
        price: values.price,
        description: values.description,
      });

      navigate("/account");
      toast.success("Product Created Successfully");
    } catch (error) {
      console.error("Product creation failed:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Create Product</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 6788cf2abcb9d79d82867ad9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bose QuietComfort" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. /assets/products/quietcomfort.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="249.00"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating Product..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminProductCreatePage;
