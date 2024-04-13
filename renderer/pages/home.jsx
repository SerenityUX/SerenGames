import React, { useEffect } from 'react';
import path from 'path';
import matter from 'gray-matter';

export default function HomePage() {
  useEffect(() => {
    const getMarkdownFiles = async () => {
      try {
        const directory = '/projects'; 
        const response = await fetch(directory);
        console.log(directory)
        if (!response.ok) {
          const errorMessage = `Failed to fetch Markdown files: ${response.statusText}`;
          throw new Error(errorMessage);
        }
        
        const fileNames = await response.json();

        fileNames.forEach(async (fileName) => {
          try {
            const fullPath = `${directory}/${fileName}`;
            const markdownResponse = await fetch(fullPath);

            if (!markdownResponse.ok) {
              throw new Error(`Failed to fetch Markdown file: ${fileName}`);
            }

            const markdownText = await markdownResponse.text();
            const { data, content } = matter(markdownText);
            console.log('Markdown Data:', data);
          } catch (error) {
            console.error(error);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    getMarkdownFiles();
  }, []);

  return (
    <React.Fragment>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <a href="/next">Go to next page</a>
        </p>
      </div>
    </React.Fragment>
  );
}
