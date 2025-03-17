import React from "react";
import {
  Box,
  Text,
  Stack,
  Link,
  Button,
  Image,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

// Component for displaying a single project in the Swiper
const ProjectSwiperCard = (props: { project: ProjectTypes }) => {
  const { project } = props; // Destructure the project prop
  const bgColor = useColorModeValue(
    "radial-gradient(circle at center, rgba(255, 224, 130, 0.1), rgba(255, 236, 179, 0.01))",
    "radial-gradient(circle at center, rgba(27, 27, 27, 0.7), rgba(25, 25, 25, 0.01))"
  );
  const buttonBg = useColorModeValue(
    "rgba(0,0,0,0.8)",
    "rgba(255, 255, 255, 0.8)"
  );
  const buttonText = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(0, 0, 0, 0.65)"
  );
  const color = useColorModeValue(
    "rgba(0,0,0,0.65)",
    "rgba(255, 255, 255, 0.7)"
  );
  const textHover = useColorModeValue(
    "rgba(0,0,0, 0.7)",
    "rgba(255, 255, 255, 0.8)"
  );
  return (
    <Box
      p={5} // Padding inside the card
      shadow="md" // Medium shadow for the card
      borderWidth="1px" // Border styling
      borderRadius="md" // Rounded corners
      bg={bgColor} // Background color
      _hover={{
        shadow: "lg", // Larger shadow on hover
        transform: "translateY(-10px)", // Lift effect on hover
      }}
      transition="all 0.3s ease" // Smooth transition for hover effect
      height="500px" // Fixed height for uniformity
      display="flex" // Flexbox for layout
      flexDirection="column" // Stack elements vertically
      justifyContent="space-between" // Distribute space between elements
      textAlign="left" // Align text to the left
    >
      {/* Image Container */}
      <Box
        overflow="hidden" // Ensure the image stays within the container
        borderRadius="md" // Rounded corners for the image container
        height="300px" // Fixed height for the image
        position="relative" // Set relative positioning for child elements
      >
        <Image
          src={`/img/stock_projs/${project.image}`} // Dynamic image source based on project data
          alt={project.title} // Alt text for accessibility
          borderRadius="md" // Rounded corners for the image
          height="100%" // Image fills the container height
          width="100%" // Image fills the container width
          objectFit="cover" // Ensure the image scales without distortion
          fallbackSrc="/img/projects/default.png" // Default image if the source fails
          transition="transform 0.3s ease" // Smooth zoom effect on hover
          _hover={{ transform: "scale(1.1)" }} // Zoom effect
        />
      </Box>

      {/* Project Title */}
      <Stack spacing={1} my="5" flex="1">
        {" "}
        {/* Ensure some spacing between title and image */}
        {project.link ? (
          // If the project has a link, wrap the title in a clickable link
          <Link href={project.link} isExternal>
            <Heading
              as="h3"
              color={color}
              size={{ base: "sm", md: "md" }} // Responsive font size
              _hover={{ color: textHover }} // Change color on hover
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3, // Limit to 3 lines
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {project.number && `${project.number} : `}{" "}
              {/* Show project number if available */}
              {project.title}
            </Heading>
          </Link>
        ) : (
          // If no link, display the title as a plain heading
          <Heading
            as="h3"
            size={{ base: "sm", md: "md" }}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3, // Limit to 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.number && `${project.number} : `}
            {project.title}
          </Heading>
        )}
      </Stack>

      {/* Link to Project Details */}
      {project.link && (
        <Link href={project.link} isExternal>
          {" "}
          {/* Open the link in a new tab */}
          <Button
            variant="solid" // Solid button style
            size="md" // Medium size
            bg={buttonBg}
            color={buttonText}
            _hover={{
              opacity: 0.9,
            }}
            borderColor={buttonBg}
          >
            View Details
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default ProjectSwiperCard;
