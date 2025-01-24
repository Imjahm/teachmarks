-- Create a new storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow public access to read images
CREATE POLICY "Allow public to read images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'images');