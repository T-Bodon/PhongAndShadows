#version 330 core
out vec4 color;

in vec3 FragPos;  
in vec3 Normal;  
  
uniform vec3 lightPos1;
uniform vec3 lightPos2; 
uniform vec3 viewPos;
uniform vec3 lightColor1;
uniform vec3 lightColor2;
uniform vec3 objectColor;

void main()
{
    // Ambient
    float ambientStrength = 0.1f;
    vec3 ambient = ambientStrength * lightColor1 * lightColor2;
  	
    // Diffuse 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos1 - FragPos);
    vec3 lightDir2 = normalize(lightPos2 - FragPos);
    float diff1 = max(dot(norm, lightDir), 0.0);
    float diff2 = max(dot(norm, lightDir2), 0.0);
    vec3 diffuse = diff1 * lightColor1 + diff2 * lightColor2;
    
    
    // Specular
    float specularStrength = 0.5f;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir1 = reflect(-lightDir, norm);  
    vec3 reflectDir2 = reflect(-lightDir2, norm);
    float spec = pow(max(dot(viewDir, reflectDir1), 0.0), 32) + pow(max(dot(viewDir, reflectDir2), 0.0), 32);
    vec3 specular = specularStrength * spec * lightColor1 * lightColor2;  
        
    vec3 result = (ambient + diffuse + specular) * objectColor;
    color = vec4(result, 1.0f);
} 

