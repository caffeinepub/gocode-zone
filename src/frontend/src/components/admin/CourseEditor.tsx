import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useGetCourseUnits, useUpdateCourseContent } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export default function CourseEditor() {
  const { data: units, isLoading } = useGetCourseUnits();
  const updateMutation = useUpdateCourseContent();
  const [editingUnit, setEditingUnit] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topics: '',
  });

  const handleEdit = (index: number) => {
    if (units && units[index]) {
      const unit = units[index];
      setEditingUnit(index);
      setFormData({
        title: unit.title,
        description: unit.description,
        topics: unit.topics.join('\n'),
      });
    }
  };

  const handleSave = async () => {
    if (editingUnit === null) return;

    const topicsArray = formData.topics
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      await updateMutation.mutateAsync({
        unitId: BigInt(editingUnit),
        title: formData.title,
        description: formData.description,
        topics: topicsArray,
      });
      toast.success('Course unit updated successfully');
      setEditingUnit(null);
    } catch (error) {
      toast.error('Failed to update course unit');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingUnit(null);
    setFormData({ title: '', description: '', topics: '' });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Course Content Editor</h2>
        <p className="text-muted-foreground">
          Edit course unit titles, descriptions, and topics
        </p>
      </div>

      <div className="space-y-4">
        {units?.map((unit, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Unit {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              {editingUnit === index ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <Input
                      id={`title-${index}`}
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Unit title"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Input
                      id={`description-${index}`}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Unit description"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`topics-${index}`}>
                      Topics (one per line)
                    </Label>
                    <Textarea
                      id={`topics-${index}`}
                      value={formData.topics}
                      onChange={(e) =>
                        setFormData({ ...formData, topics: e.target.value })
                      }
                      placeholder="Enter topics, one per line"
                      rows={8}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={updateMutation.isPending}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-lg">{unit.title}</p>
                    <p className="text-muted-foreground">{unit.description}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Topics:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {unit.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="text-muted-foreground">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={() => handleEdit(index)}>Edit Unit</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
